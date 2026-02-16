import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, X, Loader2, Code2, FileText, Trash2, MessageSquarePlus, History, ArrowLeft, ArrowDown, MoreVertical, Copy, Check, Plus, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from '@/components/ui/sheet';
import { OpenRouterService, ChatMessage } from '@/lib/ai-service';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    documentContent: string;
    onInsert: (text: string) => void;
}

interface ChatSession {
    id: string;
    title: string;
    updatedAt: number;
    messages: ChatMessage[];
}

const STORAGE_KEY = 'markdown-weaver-chat-history'; // Legacy key, migration target
const SESSIONS_KEY = 'markdown-weaver-chat-sessions';

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    onInsert?: (text: string) => void;
}

const CodeBlock = ({ inline, className, children, onInsert, ...props }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        if (!children) return;
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const match = /language-(\w+)/.exec(className || '');

    if (inline) {
        return <code className={`${className} bg-muted px-1 py-0.5 rounded text-sm`} {...props}>{children}</code>;
    }

    return (
        <div className="relative my-4 w-full rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 text-left">
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/50 border-b border-zinc-800">
                <span className="text-xs text-zinc-500 font-medium font-mono">{match ? match[1] : 'text'}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    onClick={onCopy}
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-zinc-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <code className={className} {...props}>{children}</code>
            </pre>
        </div>
    );
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    open,
    onOpenChange,
    documentContent,
    onInsert
}) => {
    const [width, setWidth] = useState(540);
    const [isResizing, setIsResizing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || isMobile) return;
            const newWidth = window.innerWidth - e.clientX;
            // Clamp width: min 300px, max 85vw
            if (newWidth > 300 && newWidth < window.innerWidth * 0.85) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            // Reset cursor styles if needed
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ew-resize';
            // Disable selection while dragging
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.userSelect = '';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // State
    const [sessions, setSessions] = useState<ChatSession[]>(() => {
        const savedSessions = localStorage.getItem(SESSIONS_KEY);
        if (savedSessions) {
            try {
                return JSON.parse(savedSessions);
            } catch (e) {
                console.error('Failed to parse sessions', e);
            }
        }

        // Migration from legacy single-chat history
        const legacyHistory = localStorage.getItem(STORAGE_KEY);
        if (legacyHistory) {
            try {
                const messages = JSON.parse(legacyHistory);
                if (Array.isArray(messages) && messages.length > 0) {
                    return [{
                        id: Date.now().toString(),
                        title: 'Previous Chat',
                        updatedAt: Date.now(),
                        messages: messages
                    }];
                }
            } catch (e) {
                console.error('Failed to migrate legacy history', e);
            }
        }

        return [];
    });

    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [view, setView] = useState<'chat' | 'history'>('chat');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Refs & Hooks
    const scrollRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const [showScrollButton, setShowScrollButton] = useState(false);
    const isAtBottomRef = useRef(true); // Track if user is at bottom to auto-scroll

    // Initialize/Ensure a session exists if none selected or empty
    useEffect(() => {
        if (sessions.length === 0 && view === 'chat') {
            createNewSession();
        } else if (!currentSessionId && sessions.length > 0 && view === 'chat') {
            // Default to most recent if not selected
            setCurrentSessionId(sessions[0].id);
        }
    }, [sessions.length, view]);

    // Derived state
    const currentSession = sessions.find(s => s.id === currentSessionId);
    const messages = currentSession?.messages || [];

    // Persistence
    useEffect(() => {
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    }, [sessions]);

    // Auto-scroll logic
    const scrollToBottom = (smooth = true) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
            isAtBottomRef.current = true;
            setShowScrollButton(false);
        }
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // Consider "at bottom" if within 50px of the bottom
        const isBottom = scrollHeight - scrollTop - clientHeight < 50;
        isAtBottomRef.current = isBottom;
        setShowScrollButton(!isBottom);
    };

    useEffect(() => {
        if (scrollRef.current && view === 'chat') {
            // Only auto-scroll if we were already at the bottom
            if (isAtBottomRef.current) {
                scrollToBottom(false); // Instant jump for better UX during streaming
            }
        }
    }, [messages, view, isLoading]);


    // Actions
    const createNewSession = () => {
        // Check for existing empty "New Chat" session to reuse
        const existingEmptySession = sessions.find(s =>
            s.title === 'New Chat' &&
            s.messages.length === 1 &&
            s.messages[0].role === 'assistant'
        );

        if (existingEmptySession) {
            setCurrentSessionId(existingEmptySession.id);
            setView('chat');
            return;
        }

        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: 'New Chat',
            updatedAt: Date.now(),
            messages: [{ role: 'assistant', content: "Hi! I'm your AI assistant. How can I help you with your document today?" }]
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
        setView('chat');
    };

    const deleteSession = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentSessionId === id) {
            setCurrentSessionId(null); // Will trigger effect to pick another or create new
            setView('history'); // Go back to history if we deleted current
        }
        toast({ title: "Chat Deleted", description: "Conversation removed from history." });
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading || !currentSessionId) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];

        // Optimistic update
        updateSession(currentSessionId, {
            messages: updatedMessages,
            updatedAt: Date.now(),
            // Update title if it's the first user message
            title: messages.length <= 1 ? (input.slice(0, 30) + (input.length > 30 ? '...' : '')) : currentSession?.title || 'New Chat'
        });

        // Force scroll to bottom when sending
        isAtBottomRef.current = true;
        setTimeout(() => scrollToBottom(true), 0);

        setInput('');
        setIsLoading(true);

        const apiKey = localStorage.getItem('openrouter_api_key');
        const model = localStorage.getItem('openrouter_model');

        if (!apiKey || !model) {
            const errorMsg: ChatMessage = { role: 'assistant', content: "Please configure your OpenRouter API Key and Model in the settings first." };
            updateSession(currentSessionId, { messages: [...updatedMessages, errorMsg] });
            setIsLoading(false);
            return;
        }

        // Construct context
        const contextMessages: ChatMessage[] = [
            {
                role: 'system',
                content: `You are an expert AI assistant for "Markdown Weaver", a premium markdown editor.
You must provide responses STRICTLY in Markdown format.

Rules:
1. **Markdown ONLY**: Your entire response MUST be valid Markdown. Do NOT start with plain text conversational filler like "Sure", "Here is...", or "I can help with that". Start DIRECTLY with Markdown syntax (headers, lists, bold text, etc.).
2. **Expertise**: Act as if you have deep knowledge of every page and line of the website.
3. **Positivity**: Never speak negatively about the project; focus on solutions and improvements.
4. **Accuracy**: Use the provided document content to answer questions precisely.
5. **Conciseness**: Be brief and to the point. 

Current document content:
\`\`\`markdown
${documentContent.slice(0, 15000)} ${documentContent.length > 15000 ? '...(truncated)' : ''}
\`\`\`
Answer user questions based on this content. Live updates are active.`
            },
            ...updatedMessages.slice(-10) // Context sizing
        ];

        try {
            let assistantMessageContent = '';
            // Temporary placebo message for streaming start
            updateSession(currentSessionId, { messages: [...updatedMessages, { role: 'assistant', content: '' }] });

            await OpenRouterService.generateCompletion(apiKey, model, contextMessages, (chunk) => {
                assistantMessageContent = chunk;
                setSessions(prev => prev.map(s => {
                    if (s.id === currentSessionId) {
                        const newMsgs = [...s.messages];
                        // If the last message is our placeholder, update it. 
                        // Note: ideally we'd track the message ID, but index works for append-only here.
                        if (newMsgs[newMsgs.length - 1].role === 'assistant') {
                            newMsgs[newMsgs.length - 1].content = chunk;
                        } else {
                            // Should not happen if we added placeholder, but safety:
                            newMsgs.push({ role: 'assistant', content: chunk });
                        }
                        return { ...s, messages: newMsgs, updatedAt: Date.now() };
                    }
                    return s;
                }));
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
            updateSession(currentSessionId, {
                messages: [...updatedMessages, { role: 'assistant', content: `Error: ${errorMessage}` }]
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateSession = (id: string, updates: Partial<ChatSession>) => {
        setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const presetPrompts = [
        { icon: <FileText size={14} />, label: "Summarize", prompt: "Can you summarize the current document?" },
        { icon: <Code2 size={14} />, label: "Code", prompt: "Write a React component example." },
        { icon: <Sparkles size={14} />, label: "Improve", prompt: "How can I improve the tone?" },
    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className={`flex flex-col p-0 transition-all duration-300 ease-in-out ${isResizing ? '!transition-none' : ''}`}
                side="right"
                style={{
                    width: isMobile ? '100%' : `${width}px`,
                    maxWidth: isMobile ? '100%' : 'none'
                }}
            >
                {/* Resize Handle - Hide on mobile */}
                {!isMobile && (
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-primary/50 transition-colors z-50 flex items-center justify-center group -ml-[3px]"
                        onMouseDown={() => setIsResizing(true)}
                    >
                        <div className="h-8 w-1 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                    </div>
                )}

                {/* Header */}
                <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0 h-16">
                    <div className='flex items-center gap-2'>
                        {view === 'chat' && (
                            <Button variant="ghost" size="icon" onClick={() => setView('history')} title="View History" className="-ml-2">
                                <ArrowLeft size={18} />
                            </Button>
                        )}
                        {view === 'history' && (
                            <Bot size={20} className="text-primary mr-2" />
                        )}
                        <div>
                            <SheetTitle className="text-base text-left">
                                {view === 'chat' ? (currentSession?.title || 'AI Assistant') : 'Chat History'}
                            </SheetTitle>
                        </div>
                    </div>

                    {/* Added mr-8 to avoid overlap with SheetClose (absolute positioned at right-4) */}
                    <div className="flex items-center gap-1 mr-8">
                        {view === 'history' && (
                            <Button variant="outline" size="sm" onClick={createNewSession} className="h-8 text-xs gap-1">
                                <MessageSquarePlus size={14} />
                                New Chat
                            </Button>
                        )}
                        {view === 'chat' && (
                            <Button variant="ghost" size="icon" onClick={() => setView('history')} title="History" className="h-8 w-8">
                                <History size={16} />
                            </Button>
                        )}
                        {view === 'chat' && (
                            <Button variant="ghost" size="icon" onClick={createNewSession} title="New Chat" className="h-8 w-8">
                                <MessageSquarePlus size={16} />
                            </Button>
                        )}
                    </div>
                </SheetHeader>

                {/* Content */}
                <div className="flex-1 relative min-h-0 bg-muted/10">
                    <div
                        className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >

                        {view === 'history' && (
                            <div className="p-4 space-y-2">
                                {sessions.length === 0 && (
                                    <div className="text-center text-muted-foreground py-10 text-sm">
                                        No chat history yet. Start a new conversation!
                                    </div>
                                )}
                                {sessions.sort((a, b) => b.updatedAt - a.updatedAt).map(session => (
                                    <div
                                        key={session.id}
                                        onClick={() => { setCurrentSessionId(session.id); setView('chat'); }}
                                        className="group flex flex-col gap-1 p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors relative"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium text-sm truncate pr-8">{session.title}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-all"
                                                onClick={(e) => deleteSession(e, session.id)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                        <div className="text-xs text-muted-foreground truncate">
                                            {session.messages[session.messages.length - 1]?.content.slice(0, 60)}...
                                        </div>
                                        <div className="text-[10px] text-muted-foreground/60 text-right mt-1">
                                            {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {view === 'chat' && (
                            <div className="flex flex-col min-h-full">
                                <div className="flex-1 p-4 space-y-4">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                                </div>
                                                <div className="flex flex-col gap-1 min-w-0 max-w-full">
                                                    <div className={`rounded-lg p-3 text-sm break-words overflow-hidden ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                        {msg.role === 'user' ? (
                                                            msg.content
                                                        ) : (
                                                            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm">
                                                                <ReactMarkdown
                                                                    components={{
                                                                        pre: ({ children }) => <>{children}</>,
                                                                        code: (props) => <CodeBlock {...props} onInsert={onInsert} />
                                                                    }}
                                                                >
                                                                    {msg.content}
                                                                </ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {msg.role === 'assistant' && msg.content !== "Hi! I'm your AI assistant. How can I help you with your document today?" && (
                                                        <div className="flex justify-end px-1">
                                                            <Button
                                                                variant="ghost"
                                                                className="h-6 px-2 text-[10px] text-muted-foreground hover:text-primary gap-1.5 hover:bg-transparent"
                                                                onClick={() => {
                                                                    if (!onInsert) return;
                                                                    // Clean up content: remove wrapping ```markdown ... ``` if present
                                                                    let cleanContent = msg.content.trim();
                                                                    if (cleanContent.startsWith('```markdown') || cleanContent.startsWith('```')) {
                                                                        cleanContent = cleanContent.replace(/^```(?:markdown)?\s+/, '').replace(/\s+```$/, '');
                                                                    }
                                                                    onInsert(cleanContent);
                                                                }}
                                                                title="Insert content into editor"
                                                            >
                                                                <LogIn size={12} />
                                                                Insert
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span className="text-xs">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {showScrollButton && view === 'chat' && (
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-md z-10 bg-background/80 backdrop-blur-sm border hover:bg-background"
                            onClick={() => scrollToBottom()}
                        >
                            <ArrowDown size={16} />
                        </Button>
                    )}
                </div>

                {/* Footer (Input) - Only visible in chat view */}
                {view === 'chat' && (
                    <div className="p-4 border-t space-y-3 bg-background">
                        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            {presetPrompts.map((p, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    className="flex-shrink-0 text-xs h-8"
                                    onClick={() => setInput(p.prompt)}
                                >
                                    {p.icon}
                                    <span className="ml-2">{p.label}</span>
                                </Button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
