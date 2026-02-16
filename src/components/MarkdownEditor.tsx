import React, { useCallback, useRef, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Upload, X, ChevronLeft, ChevronRight, Maximize, Minimize, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MindMapView } from './MindMapView';
import { Toolbar } from './Toolbar';
import { AnnouncementBar } from './AnnouncementBar';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { StatusBar } from './StatusBar';
import { SaveIndicator } from './SaveIndicator';
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor';
import { useTheme } from '@/hooks/useTheme';
import { ChatSidebar } from './ChatSidebar';
import { TableOfContents } from './TableOfContents';
import { useAI } from '@/hooks/useAI';
import { CommandPalette } from './CommandPalette';
import { toast } from 'sonner';
// import { useAutoSave } from '@/hooks/useAutoSave'; // Removed legacy hook

import { useHistory } from '@/hooks/useHistory';

import { useIsMobile } from '@/hooks/use-mobile';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from '@/components/ui/sheet';
import { Sparkles, Files, MonitorPlay, Send } from 'lucide-react';

import { saveFile, getFile, FileData, subscribeToFileEvents, FileEvent } from '@/lib/file_storage';
import { SaveStatus } from './SaveIndicator';
import { useNavigate } from 'react-router-dom';
import { Loader2, Wand2, SpellCheck, User, Zap } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { getCaretCoordinates } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface MagicFloatingMenuProps {
    position: { top: number; left: number };
    onAction: (action: 'autocomplete' | 'grammar' | 'clarity' | 'tone_professional' | 'tone_casual' | 'custom', prompt?: string) => void;
    onClose: () => void;
}

const MagicFloatingMenu: React.FC<MagicFloatingMenuProps> = ({ position, onAction, onClose }) => {
    const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);

    // Prevent menu from closing when clicking inside
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.05 } }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="absolute z-50 flex flex-col gap-1 p-1 bg-popover/90 backdrop-blur-md border border-border/50 shadow-xl rounded-xl overflow-hidden min-w-[220px]"
                style={{
                    top: position.top + 40, // Offset below cursor
                    left: position.left,
                }}
                onMouseDown={handleMouseDown}
            >
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Magic Tools
                </div>

                {!isCustomInputOpen ? (
                    <>
                        <button
                            onClick={() => onAction('autocomplete')}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors"
                        >
                            <Sparkles size={14} className="text-purple-500" />
                            <span>Continue Writing</span>
                        </button>

                        <button
                            onClick={() => onAction('grammar')}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors"
                        >
                            <SpellCheck size={14} className="text-blue-500" />
                            <span>Fix Grammar</span>
                        </button>

                        <button
                            onClick={() => onAction('clarity')}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors"
                        >
                            <Zap size={14} className="text-yellow-500" />
                            <span>Improve Clarity</span>
                        </button>

                        <div className="h-px bg-border/50 my-1" />

                        <button
                            onClick={() => onAction('tone_professional')}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors"
                        >
                            <User size={14} className="text-purple-500" />
                            <span>Make Professional</span>
                        </button>

                        <button
                            onClick={() => onAction('tone_casual')}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors"
                        >
                            <User size={14} className="text-orange-500" />
                            <span>Make Casual</span>
                        </button>

                        <div className="h-px bg-border/50 my-1" />

                        <button
                            onClick={() => setIsCustomInputOpen(true)}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-accent/50 hover:text-accent-foreground rounded-lg transition-colors w-full"
                        >
                            <Sparkles size={14} className="text-primary" />
                            <span>Ask AI...</span>
                        </button>
                    </>
                ) : (
                    <CustomPromptInput
                        onAction={onAction}
                        onClose={() => setIsCustomInputOpen(false)}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
};

const CustomPromptInput: React.FC<{
    onAction: MagicFloatingMenuProps['onAction'];
    onClose: () => void;
}> = ({ onAction, onClose }) => {
    const [customPrompt, setCustomPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customPrompt.trim()) {
            onAction('custom', customPrompt);
            setCustomPrompt('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-1">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Ask AI to..."
                    className="w-full pl-2 pr-8 py-1.5 text-xs bg-muted/50 border border-transparent focus:border-primary/50 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/70"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') onClose();
                    }}
                />
                <button
                    type="submit"
                    disabled={!customPrompt.trim()}
                    className="absolute right-1 p-1 rounded-sm text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={10} />
                </button>
            </div>
            <div className="mt-1 px-1">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-[10px] text-muted-foreground hover:text-foreground underline decoration-dotted"
                >
                    Back to menu
                </button>
            </div>
        </form>
    );
};


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

import { PresentationView } from '@/pages/Presentation';




export const MarkdownEditor: React.FC<{ fileId?: string }> = ({ fileId }) => {
    const navigate = useNavigate();
    const {
        viewMode,
        setViewMode,
        showLineNumbers,
        setShowLineNumbers,
        fontSize,
        setFontSize,
        editorRef,
        previewRef,
        syncScroll,
        setSyncScroll,
        handleEditorScroll,
        // stats, // Removed unused stats from hook if not used here, used below
    } = useMarkdownEditor();

    // File Management Logic
    const [fileData, setFileData] = useState<FileData | null>(null);

    // Initialize content
    const [content, setContent] = useState('');

    // Load File Data on Mount or ID Change
    useEffect(() => {
        const loadFile = async () => {
            if (fileId) {
                const file = await getFile(fileId);
                if (file) {
                    if (file.isTrashed) {
                        toast.error('This file is in the trash.');
                        navigate('/dashboard');
                        return;
                    }
                    setFileData(file);
                    setContent(file.content);
                } else {
                    toast.error('Document not found');
                    navigate('/dashboard');
                }
            }
        };
        loadFile();
    }, [fileId, navigate]);

    // Cleanup: Removed duplicate auto-save from wrapper component.
    // Auto-save should be handled in the Inner component or a custom hook that knows about the latest content state.

    // FIX: Render Editor ONLY when fileData is loaded.
    if (!fileData && fileId) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" /></div>;
    }

    return <MarkdownEditorInner fileId={fileId!} initialContent={fileData?.content || ''} initialTitle={fileData?.title || ''} />;
};

const MarkdownEditorInner: React.FC<{ fileId: string, initialContent: string, initialTitle: string }> = ({ fileId, initialContent, initialTitle }) => {
    const navigate = useNavigate();
    const {
        viewMode,
        setViewMode,
        showLineNumbers,
        setShowLineNumbers,
        fontSize,
        setFontSize,
        editorRef,
        previewRef,
        syncScroll,
        setSyncScroll,
        handleEditorScroll,
        handlePreviewScroll,
        handleEditorInteraction,
        handlePreviewInteraction,
    } = useMarkdownEditor();

    const isMobile = useIsMobile();
    const { theme, toggleTheme } = useTheme();

    // Use custom history hook for content management
    const {
        state: content,
        set: setContent,
        undo,
        redo,
        canUndo,
        canRedo,
        clear: clearHistory
    } = useHistory(initialContent);

    // Sync history when file changes
    useEffect(() => {
        if (initialContent !== content) {
            clearHistory(initialContent);
        }
    }, [fileId, initialContent]); // Only reset when fileId changes or initial load

    // Listen for cross-tab events (e.g. deletion)
    useEffect(() => {
        const unsubscribe = subscribeToFileEvents(async (event: FileEvent) => {
            if (event.fileId !== fileId) return;

            if (event.type === 'delete') {
                toast.error('This file was deleted in another tab.');
                navigate('/dashboard');
            } else if (event.type === 'update') {
                // Check if file was trashed
                const file = await getFile(fileId);
                if (file && file.isTrashed) {
                    toast.error('This file was moved to trash in another tab.');
                    navigate('/dashboard');
                }
            }
        });
        return () => unsubscribe();
    }, [fileId, navigate]);

    const [title, setTitle] = useState(initialTitle);

    // Auto-save logic
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
    const contentRef = useRef(content);
    const titleRef = useRef(title);
    const isDirtyRef = useRef(false);

    // Keep refs updated
    useEffect(() => {
        contentRef.current = content;
        titleRef.current = title;
        isDirtyRef.current = true;
    }, [content, title]);

    // Save function
    const performSave = useCallback(async () => {
        if (!isDirtyRef.current) return;

        try {
            setSaveStatus('saving');
            await saveFile(fileId, contentRef.current, titleRef.current);
            setSaveStatus('saved');
            isDirtyRef.current = false;
        } catch (error) {
            console.error('Auto-save failed:', error);
            setSaveStatus('error');
            toast.error('Failed to save changes');
        }
    }, [fileId]);

    // Debounced auto-save
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isDirtyRef.current) {
                performSave();
            }
        }, 1000); // 1s debounce

        return () => clearTimeout(timer);
    }, [content, title, performSave]);

    // Save on unmount / navigation
    useEffect(() => {
        const handleUnload = () => {
            if (isDirtyRef.current) {
                performSave();
            }
        };

        // For SPA navigation
        return () => {
            handleUnload();
        };
    }, [performSave]);


    const [isDragOver, setIsDragOver] = useState(false);
    const [splitPosition, setSplitPosition] = useState(50);
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [showSmartSlideDialog, setShowSmartSlideDialog] = useState(false);
    const [isGeneratingSlides, setIsGeneratingSlides] = useState(false);
    const [tocEnabled, setTocEnabled] = useState(true);
    const isResizing = useRef(false);

    // Load settings
    useEffect(() => {
        const storedToc = localStorage.getItem('enable_toc');
        if (storedToc !== null) {
            setTocEnabled(storedToc === 'true');

        }

        const handleSettingsChange = () => {
            const newStoredToc = localStorage.getItem('enable_toc');
            if (newStoredToc !== null) {
                setTocEnabled(newStoredToc === 'true');
            }
        };

        window.addEventListener('settings-changed', handleSettingsChange);
        return () => window.removeEventListener('settings-changed', handleSettingsChange);
    }, []);

    // Calculate stats from content
    const currentStats = React.useMemo(() => {
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const characters = content.length;
        const lines = content.split('\n').length;
        return { words, characters, lines };
    }, [content]);


    const handleTemplateSelect = useCallback((templateContent: string) => {
        setContent(templateContent);
        toast.success('Template loaded!', {
            description: 'Start editing your new document.',
            icon: <img src="/favicon.svg" className="w-5 h-5" alt="Logo" />,
        });
    }, [setContent, toast]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(content);
        toast.success('Copied!', {
            description: 'Markdown content copied to clipboard.',
            icon: <img src="/favicon.svg" className="w-5 h-5" alt="Logo" />,
        });
    }, [content, toast]);

    const handleExport = useCallback((format: 'markdown' | 'html') => {
        if (format === 'markdown') {
            const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
            saveAs(blob, 'document.md');
        } else {
            let previewHTML = document.querySelector('.markdown-preview')?.innerHTML || '<p>No preview available</p>';

            // Remove copy buttons from exported HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = previewHTML;
            const copyButtons = tempDiv.querySelectorAll('button[aria-label*="Copy"]');
            copyButtons.forEach(btn => btn.remove());
            previewHTML = tempDiv.innerHTML;

            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; background: #fff; }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; }
    h1 { font-size: 2.25rem; }
    h2 { font-size: 1.875rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    p { margin-bottom: 1rem; }
    ul, ol { margin-left: 2rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    code { background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: 'Courier New', monospace; color: #d946ef; }
    pre { background: #1e1e1e; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
    pre code { background: none; color: #e5e7eb; padding: 0; }
    .hljs { color: #e5e7eb; background: #1e1e1e; }
    .hljs-string { color: #86efac; }
    .hljs-number { color: #fbbf24; }
    .hljs-literal { color: #60a5fa; }
    .hljs-attr { color: #f472b6; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th { background: #f3f4f6; font-weight: 600; }
    th, td { border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; }
    tr:nth-child(even) { background: #f9fafb; }
    blockquote { border-left: 4px solid #0d9488; padding-left: 1rem; margin: 1rem 0; color: #666; font-style: italic; }
    a { color: #0d9488; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
  </style>
</head>
<body>
  ${previewHTML}
</body>
</html>`;
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            saveAs(blob, 'document.html');
        }
        toast.success('Exported!', {
            description: `Document exported as ${format.toUpperCase()}.`,
            icon: <img src="/favicon.svg" className="w-5 h-5" alt="Logo" />,
        });
    }, [content, toast]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt'))) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                setContent(text);
                toast.success('File imported!', {
                    description: `Loaded ${file.name}`,
                    icon: <img src="/favicon.svg" className="w-5 h-5" alt="Logo" />,
                });
            };
            reader.readAsText(file);
        } else {
            toast.error('Invalid file', {
                description: 'Please drop a .md, .markdown, or .txt file.',
            });
        }
    }, [setContent, toast]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleMouseDown = useCallback(() => {
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing.current) return;
        const container = document.getElementById('editor-container');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
        setSplitPosition(Math.min(Math.max(newPosition, 20), 80));
    }, []);

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    // Global Keyboard Shortcuts
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.code === 'KeyP') {
                e.preventDefault();
                setIsPresentationMode(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    // AI Integration
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { isGenerating, autocomplete, refactorText, generateSlides } = useAI();

    const handleMagicAction = useCallback((action: 'autocomplete' | 'grammar' | 'clarity' | 'tone_professional' | 'tone_casual' | 'custom', prompt?: string) => {
        const textarea = editorRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        if (action === 'autocomplete') {
            // Use text before cursor as context
            const prefix = content.substring(0, end);
            autocomplete(prefix, (continuingText) => {
                // Insert at cursor
                const newContent = content.substring(0, end) + continuingText + content.substring(end);
                setContent(newContent);
                toast.success('Autocompleted!', { description: 'Text added.' });
            });
        } else {
            // Refactoring actions need selection
            if (!selectedText.trim()) {
                toast.info('Selection required', { description: 'Please select text to modify.' });
            }

            let instruction = '';
            switch (action) {
                case 'grammar': instruction = 'Fix grammar and spelling'; break;
                case 'clarity': instruction = 'Improve clarity and readability'; break;
                case 'tone_professional': instruction = 'Rewrite in a professional tone'; break;
                case 'tone_casual': instruction = 'Rewrite in a casual tone'; break;
                case 'custom': instruction = prompt || 'Improve this text'; break;
            }

            refactorText(selectedText, instruction, (newText) => {
                const newContent = content.substring(0, start) + newText + content.substring(end);
                setContent(newContent);
            });
        }
    }, [content, editorRef, setContent, autocomplete, refactorText, toast]);

    /* 
     * NEW: Handle Insert from Chat
     * This function inserts text at the current cursor position or appends it.
     */
    const handleInsert = useCallback((text: string) => {
        const textarea = editorRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert text
        const newContent = content.substring(0, start) + text + content.substring(end);
        setContent(newContent);

        // Move cursor to end of inserted text
        // We need to wait for render check or just assume state update
        // Ideally we'd set selection in a useEffect after content change, but for now this is a simple "insert"
        toast.success('Inserted!', { description: 'Content added to editor.' });
    }, [content, setContent]);


    // --- Magic Floating Menu Logic ---
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
    const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
    const lastSelectionWarning = useRef(0);

    const handleSelectionChange = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectionLength = end - start;

        if (selectionLength > 0) {
            // CONSTRAINT: Limit Magic Tools to reasonable selection sizes to prevent UI freeze
            if (selectionLength > 5000) {
                const now = Date.now();
                if (now - lastSelectionWarning.current > 2000) {
                    toast.warning('Selection too large for Magic Tools', { description: 'Please select a smaller section (max 5000 characters).', id: 'selection-warning' });
                    lastSelectionWarning.current = now;
                }
                if (menuPosition) { setMenuPosition(null); setSelectionRange(null); }
                return;
            }


            // Text is selected
            const coords = getCaretCoordinates(textarea, end);

            // Hacky but robust way:
            const rect = textarea.getBoundingClientRect();
            const container = document.getElementById('editor-container');
            const containerRect = container?.getBoundingClientRect() || { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };

            // Calculate raw position absolute to the container
            let top = rect.top - containerRect.top + coords.top;
            let left = rect.left - containerRect.left + coords.left;

            // --- CLAMPING LOGIC ---
            // Ensure menu doesn't go off-screen. 
            // We assume menu width ~220px and height ~300px (worst case)
            const MENU_WIDTH = 240;
            const MENU_HEIGHT = 320;

            // Clamp horizontal
            if (left + MENU_WIDTH > containerRect.width) {
                left = containerRect.width - MENU_WIDTH - 10; // 10px padding
            }
            if (left < 0) left = 10;

            // Clamp vertical
            // If it's too close to bottom, show it ABOVE the cursor
            if (top + MENU_HEIGHT > containerRect.height) {
                // Position above usage: subtract height
                // coords.top is essentially caret bottom. 
                // We might need to subtract line height to go above, but let's just shift up.
                top = top - MENU_HEIGHT - 20; // 20px gap
            }

            // If top is still negative (e.g. huge selection going off top), clamp to top
            if (top < 10) top = 10;

            setMenuPosition({ top, left });
            setSelectionRange({ start, end });
        } else {
            setMenuPosition(null);
            setSelectionRange(null);
        }
    }, [menuPosition]);

    const handleFloatingAction = (action: 'autocomplete' | 'grammar' | 'clarity' | 'tone_professional' | 'tone_casual' | 'custom', prompt?: string) => {
        handleMagicAction(action, prompt);
        setMenuPosition(null); // Close menu immediately
    };



    // Auto-close menu when generation finishes?
    useEffect(() => {
        if (!isGenerating && menuPosition) {
            // If we were just generating, maybe close it?
            // But checking "just generating" is hard without ref.
            // For now, let's just let the user dismiss it or keep it open.
            // Better UX: Keep it open so they see the result, but maybe unblock it?

            // If we want to auto-close:
            // setMenuPosition(null); 
            // But that might be annoying if they want to do another action.

            // Let's Just keep it open but remove the loader (which happens automatically via prop).
        }
    }, [isGenerating]);


    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    const handleSmartGenerate = () => {
        setIsGeneratingSlides(true);

        // Detect device type for AI optimization
        const width = window.innerWidth;
        let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
        if (width < 768) {
            deviceType = 'mobile';
        } else if (width < 1024) {
            deviceType = 'tablet';
        }

        generateSlides(content, (newContent) => {
            setContent(newContent);
            setIsGeneratingSlides(false);
            setIsPresentationMode(true);
        }, deviceType);
    };

    return (
        <>
            <CommandPalette
                open={isCommandPaletteOpen}
                onOpenChange={setIsCommandPaletteOpen}
                onExport={handleExport}
                onCopy={handleCopy}
                setViewMode={setViewMode}
                toggleChat={() => setIsChatOpen(prev => !prev)}
                togglePresentation={() => setShowSmartSlideDialog(true)}
            />
            <div
                className="flex flex-col h-screen bg-background"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {isDragOver && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm border-2 border-dashed border-primary rounded-lg m-4">
                        <div className="flex flex-col items-center gap-3 text-primary">
                            <Upload size={48} />
                            <p className="text-lg font-medium">Drop your Markdown file here</p>
                        </div>
                    </div>
                )}

                <Toolbar
                    onBack={() => navigate('/dashboard')}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    theme={theme}
                    onThemeToggle={toggleTheme}
                    onExport={handleExport}
                    onCopy={handleCopy}
                    onTemplateSelect={handleTemplateSelect}

                    isMobile={isMobile}
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    showLineNumbers={showLineNumbers}
                    onShowLineNumbersChange={setShowLineNumbers}
                    syncScroll={syncScroll}
                    onSyncScrollChange={setSyncScroll}
                    onToggleChat={() => setIsChatOpen(!isChatOpen)}
                    isChatOpen={isChatOpen}
                    onMagicAction={handleMagicAction}
                    isGenerating={isGenerating}
                    onTogglePresentation={() => {
                        // ALWAYS Open Custom Dialog to give choice
                        setShowSmartSlideDialog(true);
                    }}
                    isPresentationMode={isPresentationMode}
                    isPresentationLoading={isGeneratingSlides}
                    onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                // Custom prop to add specific button or just add a direct button here if Toolbar supports children or custom actions.
                // Since Toolbar is rigid, we might need to modify Toolbar.tsx or add a wrapper.
                // Let's modify Toolbar.tsx actually.
                />

                {/* Quick hack: Over-lay "Back" button if Toolbar doesn't support it yet, or modify Toolbar. 
                Let's modifying Toolbar.tsx is better practice. */}

                <Sheet open={showSmartSlideDialog} onOpenChange={setShowSmartSlideDialog}>
                    <SheetContent side="bottom" className="mx-auto w-full max-w-lg rounded-t-xl sm:rounded-xl sm:bottom-6 sm:mb-0 border shadow-2xl bg-card/95 backdrop-blur-sm p-6 max-h-[90vh] overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <div className="mx-auto h-1.5 w-12 rounded-full bg-muted/50 mb-4 sm:hidden" />
                            <SheetTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                                <MonitorPlay className="w-6 h-6 text-primary" />
                                AI Presentation Mode
                            </SheetTitle>
                            <SheetDescription className="text-center text-muted-foreground text-sm sm:text-base mt-2">
                                Choose how you want to present your content using our smart slide engine.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div
                                className="group relative flex flex-col items-center justify-between gap-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary/50 transition-all cursor-pointer"
                                onClick={() => {
                                    setShowSmartSlideDialog(false);
                                    handleSmartGenerate();
                                }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1 text-center">
                                    <h3 className="font-semibold leading-none tracking-tight">Smart Generate</h3>
                                    <p className="text-xs text-muted-foreground">AI structures your slides automatically</p>
                                </div>
                            </div>

                            <div
                                className="group relative flex flex-col items-center justify-between gap-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary/50 transition-all cursor-pointer"
                                onClick={() => {
                                    setShowSmartSlideDialog(false);
                                    setIsPresentationMode(true);
                                }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
                                    <Files className="h-6 w-6 text-foreground" />
                                </div>
                                <div className="space-y-1 text-center">
                                    <h3 className="font-semibold leading-none tracking-tight">Present As-Is</h3>
                                    <p className="text-xs text-muted-foreground">Use existing '---' separators</p>
                                </div>
                            </div>
                        </div>

                        <SheetFooter className="mt-8">
                            <SheetClose asChild>
                                <Button variant="ghost" className="w-full">Cancel</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                <ChatSidebar
                    open={isChatOpen}
                    onOpenChange={setIsChatOpen}
                    documentContent={content}
                    onInsert={handleInsert}
                />

                <AnnouncementBar
                    isVisible={showAnnouncement}
                    onClose={() => setShowAnnouncement(false)}
                />

                <div
                    id="editor-container"
                    className="flex-1 flex flex-col md:flex-row overflow-hidden relative"
                >
                    {viewMode === 'mindmap' ? (
                        <ErrorBoundary name="Mind Map">
                            <MindMapView content={content} theme={theme} />
                        </ErrorBoundary>
                    ) : (
                        <>
                            {(viewMode === 'split' || viewMode === 'editor') && (
                                <div
                                    className={`${viewMode === 'split' ? 'h-1/2 md:h-full' : 'h-full'} overflow-hidden relative`}
                                    style={{
                                        width: viewMode === 'split' ? undefined : '100%',
                                        flex: viewMode === 'split' ? `0 0 ${splitPosition}%` : undefined,
                                        minWidth: viewMode === 'split' ? '150px' : undefined,
                                    }}
                                >
                                    <Editor
                                        content={content}
                                        onChange={(val) => setContent(val, 'type')}
                                        fontSize={fontSize}
                                        showLineNumbers={showLineNumbers}
                                        editorRef={editorRef}
                                        onScroll={handleEditorScroll}
                                        onInteraction={handleEditorInteraction}
                                        onUndo={undo}
                                        onRedo={redo}
                                        onSelect={handleSelectionChange}
                                    />
                                    {menuPosition && (
                                        <MagicFloatingMenu
                                            position={menuPosition}
                                            onAction={handleFloatingAction}
                                            onClose={() => setMenuPosition(null)}
                                        />
                                    )}

                                    {/* Fixed AI Loading Indicator */}
                                    <AnimatePresence>
                                        {isGenerating && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                                className="absolute bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-background/80 backdrop-blur-md border border-primary/20 shadow-lg rounded-full"
                                            >
                                                <div className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                                </div>
                                                <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                                                    AI is working...
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            )}

                            {viewMode === 'split' && (
                                <div
                                    className={`resize-handle ${isMobile ? 'hidden' : 'hidden md:block'}`}
                                    onMouseDown={handleMouseDown}
                                    role="separator"
                                    aria-label="Resize editor and preview"
                                />
                            )}

                            {(viewMode === 'split' || viewMode === 'preview') && (
                                <div
                                    className={`${viewMode === 'split' ? 'h-1/2 md:h-full' : 'h-full'} overflow-hidden border-t md:border-t-0 md:border-l border-border relative`} // Added relative for positioning if needed
                                    style={{
                                        width: viewMode === 'split' ? undefined : '100%',
                                        flex: viewMode === 'split' ? `0 0 ${100 - splitPosition}%` : undefined,
                                        minWidth: viewMode === 'split' ? '150px' : undefined,
                                    }}
                                >
                                    {tocEnabled && (
                                        <TableOfContents
                                            content={content}
                                            previewRef={previewRef}
                                            editorRef={editorRef}
                                            fontSize={fontSize}
                                            syncScroll={syncScroll}
                                        />
                                    )}
                                    <ErrorBoundary name="Preview">
                                        <Preview content={content} previewRef={previewRef} onScroll={handlePreviewScroll} onInteraction={handlePreviewInteraction} />
                                    </ErrorBoundary>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <StatusBar
                    stats={currentStats}
                    saveIndicator={<SaveIndicator status={saveStatus} />}
                />

                {isPresentationMode && (
                    <PresentationView content={content} onClose={() => setIsPresentationMode(false)} />
                )}
            </div>
        </>
    );
};