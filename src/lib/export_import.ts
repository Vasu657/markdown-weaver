import { FileData, getAllFiles, deleteAllFiles, restoreFiles } from './file_storage';

interface ExportSchema {
    version: number;
    timestamp: number;
    files: FileData[];
    settings: {
        theme?: string | null;
        openrouterApiKey?: string | null;
        openrouterModel?: string | null;
        enableToc?: string | null;
        currentDraft?: string | null;
    };
    chatSessions?: any[]; // We use any to avoid complex type imports, but it matches ChatSession[]
}

const EXPORT_VERSION = 2; // Bumped version for chat support

export const exportData = async () => {
    try {
        const files = await getAllFiles();

        const settings = {
            theme: localStorage.getItem('markdown-pro-theme'),
            openrouterApiKey: localStorage.getItem('openrouter_api_key'),
            openrouterModel: localStorage.getItem('openrouter_model'),
            enableToc: localStorage.getItem('enable_toc'),
            currentDraft: localStorage.getItem('markdown-pro-content'),
        };

        // Get chat history
        const chatSessionsRaw = localStorage.getItem('markdown-weaver-chat-sessions');
        const chatSessions = chatSessionsRaw ? JSON.parse(chatSessionsRaw) : [];

        const exportObj: ExportSchema = {
            version: EXPORT_VERSION,
            timestamp: Date.now(),
            files,
            settings,
            chatSessions
        };

        const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `markdown-weaver-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
    } catch (e) {
        console.error('Export failed', e);
        return false;
    }
};

export const importData = async (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const content = e.target?.result as string;
                if (!content) throw new Error('Empty file');

                const data = JSON.parse(content) as ExportSchema;

                // Basic validation
                if (!data.files || !Array.isArray(data.files)) {
                    throw new Error('Invalid backup format: missing files');
                }

                // Restore Settings
                if (data.settings) {
                    if (data.settings.theme) localStorage.setItem('markdown-pro-theme', data.settings.theme);
                    if (data.settings.openrouterApiKey) localStorage.setItem('openrouter_api_key', data.settings.openrouterApiKey);
                    if (data.settings.openrouterModel) localStorage.setItem('openrouter_model', data.settings.openrouterModel);
                    if (data.settings.enableToc) localStorage.setItem('enable_toc', data.settings.enableToc);
                    if (data.settings.currentDraft) localStorage.setItem('markdown-pro-content', data.settings.currentDraft);
                }

                // Restore Chat History
                if (data.chatSessions && Array.isArray(data.chatSessions)) {
                    localStorage.setItem('markdown-weaver-chat-sessions', JSON.stringify(data.chatSessions));
                }

                // Restore Files
                await deleteAllFiles();
                if (data.files.length > 0) {
                    await restoreFiles(data.files);
                }

                resolve(true);
            } catch (err) {
                console.error('Import failed', err);
                reject(err);
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
};
