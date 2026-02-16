import { v4 as uuidv4 } from 'uuid';
import { get, set, del, keys, setMany } from 'idb-keyval';

export interface FileData {
    id: string;
    title: string;
    content: string;
    lastModified: number;
    isFavorite?: boolean;
    isTrashed?: boolean;
}

const STORAGE_KEY_PREFIX = 'markdown-weaver-file-';
const INDEX_KEY = 'markdown-weaver-files-index';
const LEGACY_KEY = 'markdown-weaver-v1-content';
const BROADCAST_CHANNEL_NAME = 'markdown-weaver-events';

const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

export type FileEventType = 'create' | 'update' | 'delete';

export interface FileEvent {
    type: FileEventType;
    fileId: string;
}

export const subscribeToFileEvents = (callback: (event: FileEvent) => void) => {
    const handler = (message: MessageEvent) => {
        callback(message.data);
    };
    channel.addEventListener('message', handler);
    return () => channel.removeEventListener('message', handler);
};

const notifySubscribers = (type: FileEventType, fileId: string) => {
    channel.postMessage({ type, fileId });
};

// Setup default initial content if nothing exists
const DEFAULT_CONTENT = `# Welcome to Markdown Weaver v1.3.0

You can start writing immediately, or choose a template:

- **README** → great for GitHub projects
- **Blog Post** → articles & announcements
- **Meeting Notes** → structured meeting records
- **Projection** → budgets, timelines, Gantt
- **Mindmap** → hierarchical planning
- **Notes** → quick todos & braindumps

Just delete this text and begin — or ask the AI assistant to "apply the README template"!

Happy writing! 🚀`;

export const getFile = async (id: string): Promise<FileData | null> => {
    try {
        const data = await get(STORAGE_KEY_PREFIX + id);
        return data || null;
    } catch (e) {
        console.error('Failed to get file', e);
        return null;
    }
};

export const getAllFiles = async (): Promise<FileData[]> => {
    try {
        const index = await get(INDEX_KEY);
        const ids: string[] = index || [];

        const files: FileData[] = [];
        // Fetch all files in parallel
        const promises = ids.map(id => getFile(id));
        const results = await Promise.all(promises);

        results.forEach(file => {
            if (file) files.push(file);
        });

        // Sort by last modified desc
        return files.sort((a, b) => b.lastModified - a.lastModified);
    } catch (e) {
        console.error('Failed to get all files', e);
        return [];
    }
};

export const getProjectCount = async (): Promise<number> => {
    try {
        const index = await get(INDEX_KEY);
        return index ? index.length : 0;
    } catch (e) {
        console.error('Failed to get project count', e);
        return 0;
    }
};

// Helper to use locks if available, or fallback (for compatibility, though modern browsers have it)
const withLock = async <T>(name: string, callback: () => Promise<T>): Promise<T> => {
    if (navigator && navigator.locks) {
        return navigator.locks.request(name, callback);
    }
    return callback();
};

export const saveFile = async (id: string, content: string, title?: string) => {
    try {
        await withLock('markdown_weaver_file_lock', async () => {
            const existing = await getFile(id);
            const file: FileData = {
                id,
                content,
                title: title || existing?.title || 'Untitled Document',
                lastModified: Date.now(),
                isFavorite: existing?.isFavorite,
                isTrashed: existing?.isTrashed
            };

            await set(STORAGE_KEY_PREFIX + id, file);

            // Update index if new
            const index = await get(INDEX_KEY);
            let ids: string[] = index || [];
            if (!ids.includes(id)) {
                ids.push(id);
                await set(INDEX_KEY, ids);
                notifySubscribers('create', id);
            } else {
                notifySubscribers('update', id);
            }
        });
    } catch (e) {
        console.error('Failed to save file', e);
        throw e;
    }
};

export const updateFileMetadata = async (id: string, updates: Partial<FileData>) => {
    try {
        await withLock('markdown_weaver_file_lock', async () => {
            const file = await getFile(id);
            if (!file) return;

            const updated = { ...file, ...updates, lastModified: Date.now() };
            await set(STORAGE_KEY_PREFIX + id, updated);
            notifySubscribers('update', id);
        });
    } catch (e) {
        console.error('Failed to update metadata', e);
    }
}

export const createFile = async (initialContent: string = '', initialTitle: string = 'Untitled Document'): Promise<string> => {
    const id = uuidv4();
    await saveFile(id, initialContent || '', initialTitle);
    return id;
};

export const deleteFile = async (id: string) => {
    try {
        await withLock('markdown_weaver_file_lock', async () => {
            await del(STORAGE_KEY_PREFIX + id);

            const index = await get(INDEX_KEY);
            if (index) {
                let ids: string[] = index;
                ids = ids.filter(i => i !== id);
                await set(INDEX_KEY, ids);
                notifySubscribers('delete', id);
            }
        });
    } catch (e) {
        console.error('Failed to delete file', e);
    }
};

export const deleteAllFiles = async () => {
    try {
        const index = await get(INDEX_KEY);
        if (index && Array.isArray(index)) {
            const ids: string[] = index;
            await Promise.all(ids.map(id => del(STORAGE_KEY_PREFIX + id)));
        }
        await del(INDEX_KEY);
        // We might want to notify that everything is gone, but 'delete' event expects an ID.
        // For now, we'll rely on the caller to reload or re-fetch.
    } catch (e) {
        console.error('Failed to delete all files', e);
    }
};

export const restoreFiles = async (files: FileData[]) => {
    try {
        // Prepare entries for key-value store
        const entries: [string, FileData][] = files.map(file => [STORAGE_KEY_PREFIX + file.id, file]);

        // Save all files
        await setMany(entries);

        // Update index
        const ids = files.map(file => file.id);
        await set(INDEX_KEY, ids);

        // Notify subscribers (generalized update)
        // Since we are restoring everything, individual notifications might be too much.
        // But for consistency let's notify for the first one or just expect a reload.
        // Ideally we should have a 'refresh' event, but 'create' works for now if we want to trigger updates.
    } catch (e) {
        console.error('Failed to restore files', e);
        throw e;
    }
};

export const migrateLegacyData = async (): Promise<boolean> => {
    const hasMigrated = localStorage.getItem('markdown-weaver-migrated-indexeddb');
    if (hasMigrated) return false;

    try {
        // 1. Check for legacy v1 single-file content
        const legacyContent = localStorage.getItem(LEGACY_KEY);

        // 2. Check for v2 localStorage files
        const indexStr = localStorage.getItem(INDEX_KEY);
        const v2Ids: string[] = indexStr ? JSON.parse(indexStr) : [];

        const filesToMigrate: [string, any][] = [];
        const newIndex: string[] = [];

        // Migrate v2 files
        for (const id of v2Ids) {
            const data = localStorage.getItem(STORAGE_KEY_PREFIX + id);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    filesToMigrate.push([STORAGE_KEY_PREFIX + id, parsed]);
                    newIndex.push(id);
                } catch (e) {
                    console.error('Failed to parse legacy file', id);
                }
            }
        }

        // Migrate v1 content if no v2 files and it exists
        if (filesToMigrate.length === 0 && legacyContent) {
            const id = uuidv4();
            const file: FileData = {
                id,
                content: legacyContent,
                title: 'Migrated Document',
                lastModified: Date.now()
            };
            filesToMigrate.push([STORAGE_KEY_PREFIX + id, file]);
            newIndex.push(id);
        }

        // Initialize with default if absolutely nothing exists
        if (filesToMigrate.length === 0 && !legacyContent) {
            const id = uuidv4();
            const file: FileData = {
                id,
                content: DEFAULT_CONTENT,
                title: 'Welcome to Markdown Weaver',
                lastModified: Date.now()
            };
            filesToMigrate.push([STORAGE_KEY_PREFIX + id, file]);
            newIndex.push(id);
        }

        // Batch save to IndexedDB
        if (filesToMigrate.length > 0) {
            await setMany(filesToMigrate);
            await set(INDEX_KEY, newIndex);
        }

        localStorage.setItem('markdown-weaver-migrated-indexeddb', 'true');
        console.log('Migration to IndexedDB completed successfully.');
        return true;
    } catch (e) {
        console.error('Migration failed', e);
        return false;
    }
};
