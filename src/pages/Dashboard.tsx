import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, FileText, Trash2, MoreVertical, Pencil, Search,
    LayoutGrid, List as ListIcon, Clock, Sparkles, Sun, Moon,
    LayoutDashboard, Star, Settings, ChevronRight, FolderOpen,
    Bell, HelpCircle, Info,
    Menu, X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { getAllFiles, createFile, deleteFile, migrateLegacyData, FileData, updateFileMetadata, subscribeToFileEvents } from '@/lib/file_storage';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { templates } from '@/lib/templates';
import { SettingsDialog } from '@/components/SettingsDialog';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { GitHubStarCTA } from '@/components/GitHubStarCTA';

export default function Dashboard() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [files, setFiles] = useState<FileData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);
    const [fileToRename, setFileToRename] = useState<FileData | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'trash'>('all');
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAnnouncement, setShowAnnouncement] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await migrateLegacyData();
            await refreshFiles();
            setIsLoading(false);
        };
        init();

        // Subscribe to cross-tab events
        const unsubscribe = subscribeToFileEvents((event) => {
            refreshFiles();
        });

        return () => unsubscribe();
    }, []);

    const refreshFiles = async () => {
        const loadedFiles = await getAllFiles();
        setFiles(loadedFiles);
    };

    const handleCreateNew = () => {
        setIsTemplateOpen(true);
    };

    const handleTemplateSelect = async (templateId: string) => {
        let content = '';
        let title = 'Untitled Document';

        if (templateId !== 'blank') {
            const template = templates.find(t => t.id === templateId);
            if (template) {
                content = template.content;
                title = template.name;
            }
        }

        const id = await createFile(content, title);
        toast.success(templateId === 'blank' ? 'New document created' : `Created from ${title} template`);
        navigate(`/editor/${id}`);
        setIsTemplateOpen(false);
    };

    const handleToggleFavorite = async (file: FileData, e?: React.MouseEvent) => {
        e?.stopPropagation();
        await updateFileMetadata(file.id, { isFavorite: !file.isFavorite });
        await refreshFiles();
        if (!file.isFavorite) {
            toast.success('Added to favorites');
        } else {
            toast.success('Removed from favorites');
        }
    };

    const handleRestore = async (file: FileData) => {
        await updateFileMetadata(file.id, { isTrashed: false });
        await refreshFiles();
        toast.success('Project restored');
    };

    const handleDelete = async () => {
        if (fileToDelete) {
            const file = files.find(f => f.id === fileToDelete);
            if (file) {
                if (file.isTrashed) {
                    // Hard delete
                    await deleteFile(fileToDelete);
                    toast.success('Project deleted permanently');
                } else {
                    // Soft delete (move to trash)
                    await updateFileMetadata(fileToDelete, { isTrashed: true });
                    toast.success('Moved to trash');
                }
            }
            setFileToDelete(null);
            await refreshFiles();
        }
    };

    const handleRename = async () => {
        if (fileToRename && newTitle.trim()) {
            await updateFileMetadata(fileToRename.id, { title: newTitle.trim() });
            setFileToRename(null);
            setNewTitle('');
            await refreshFiles();
            toast.success('Document renamed');
        }
    };

    const openRenameDialog = (file: FileData) => {
        setFileToRename(file);
        setNewTitle(file.title);
    }

    const filteredFiles = files.filter(f => {
        const content = f.content || '';
        const title = f.title || '';
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeTab === 'trash') {
            return f.isTrashed;
        } else if (activeTab === 'favorites') {
            return f.isFavorite && !f.isTrashed;
        } else {
            // 'all' tab shows non-trashed files
            return !f.isTrashed;
        }
    });

    // Stats calculation
    const activeFiles = files.filter(f => !f.isTrashed);
    const totalWords = activeFiles.reduce((acc, file) => acc + ((file.content || '').trim().split(/\s+/).length || 0), 0);
    const totalProjects = activeFiles.length;

    const favoritesCount = activeFiles.filter(f => f.isFavorite).length;
    const trashCount = files.filter(f => f.isTrashed).length;

    const sidebarItems = [
        { id: 'all', label: 'All Projects', icon: LayoutDashboard, count: activeFiles.length },
        { id: 'favorites', label: 'Favorites', icon: Star, count: favoritesCount },
        { id: 'trash', label: 'Trash', icon: Trash2, count: trashCount },
    ];

    const sidebarPages = [
        { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
        { id: 'help', label: 'Help & Guide', icon: HelpCircle, path: '/help' },
        { id: 'about', label: 'About', icon: Info, path: '/about' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && window.innerWidth < 768 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: sidebarOpen ? 280 : 0,
                    x: sidebarOpen ? 0 : -280,
                    opacity: sidebarOpen ? 1 : 0
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed md:relative z-50 h-screen bg-card/80 md:bg-card/50 backdrop-blur-xl border-r border-border/40 flex flex-col overflow-hidden whitespace-nowrap`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Sparkles size={20} />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                Weaver
                            </h1>
                        </div>
                        {/* Mobile Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id as any);
                                    if (window.innerWidth < 768) setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${activeTab === item.id
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <item.icon size={18} className={activeTab === item.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} />
                                <span>{item.label}</span>
                                {item.count > 0 && (
                                    <span className={`ml-auto text-xs px-2 py-1 rounded-md border 
                                        ${activeTab === item.id
                                            ? 'bg-primary/20 border-primary/20 text-primary'
                                            : 'bg-background/50 border-border/50 text-muted-foreground'
                                        }`}
                                    >
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        ))}

                        <div className="my-4 border-t border-border/40 px-2" />

                        {sidebarPages.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    navigate(item.path);
                                    if (window.innerWidth < 768) setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-muted text-muted-foreground hover:text-foreground`}
                            >
                                <item.icon size={18} className="text-muted-foreground group-hover:text-foreground" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-border/40 space-y-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                        <h4 className="text-sm font-medium mb-1">Pro Tip</h4>
                        <p className="text-xs text-muted-foreground">Press <kbd className="px-1 py-0.5 rounded bg-background border border-border">Ctrl+K</kbd> to search quickly.</p>
                    </div>

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-muted text-muted-foreground hover:text-foreground"
                    >
                        <Settings size={18} className="text-muted-foreground group-hover:text-foreground" />
                        <span>Settings</span>
                    </button>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs font-bold">ME</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">My Space</span>
                                <span className="text-[10px] text-muted-foreground">Free Plan</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full"
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </Button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto bg-background/50 relative">
                <AnnouncementBar
                    isVisible={showAnnouncement}
                    onClose={() => setShowAnnouncement(false)}
                />
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col gap-6">
                        {/* Top Row: Title & Operations */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                                {/* Desktop Welcome Text */}
                                <p className="text-muted-foreground mt-1 hidden md:block">Welcome back! You've written <span className="text-foreground font-medium">{totalWords.toLocaleString()}</span> words so far.</p>
                            </div>

                            {/* Mobile Menu Toggle - Right Aligned */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu />
                            </Button>
                        </div>

                        {/* Mobile Welcome Text (Below Header) */}
                        <p className="text-muted-foreground md:hidden">Welcome back! You've written <span className="text-foreground font-medium">{totalWords.toLocaleString()}</span> words so far.</p>

                        {/* Search & Actions Row */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search projects..."
                                    className="pl-10 h-11 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleCreateNew}
                                size="icon"
                                className="h-11 w-11 rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 shrink-0"
                            >
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FolderOpen size={18} className="text-primary" />
                                Recent Projects
                            </h3>
                            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                                <Button
                                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="h-8 w-8 p-0 rounded-md"
                                >
                                    <LayoutGrid size={14} />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="h-8 w-8 p-0 rounded-md"
                                >
                                    <ListIcon size={14} />
                                </Button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                                <p className="text-muted-foreground">Loading projects...</p>
                            </div>
                        ) : filteredFiles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <FileText className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                                <p className="text-muted-foreground max-w-sm mb-8">Start your writing journey by creating your first project.</p>
                                <Button onClick={handleCreateNew} variant="outline" className="rounded-xl">
                                    Create New Project
                                </Button>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "space-y-3"
                            }>
                                {filteredFiles.map((file, index) => (
                                    <motion.div
                                        key={file.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        className={`group relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 overflow-hidden cursor-pointer transition-all duration-300
                                            ${viewMode === 'list'
                                                ? 'flex items-center p-4 rounded-xl hover:bg-muted/30'
                                                : 'flex flex-col rounded-3xl h-[220px] shadow-sm hover:shadow-xl hover:shadow-primary/5'
                                            }`
                                        }
                                        onClick={() => navigate(`/editor/${file.id}`)}
                                    >
                                        {/* Grid View specific visuals */}
                                        {viewMode === 'grid' && (
                                            <div className="h-[140px] w-full bg-gradient-to-b from-muted/30 to-transparent p-6 relative overflow-hidden">
                                                <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
                                                <p className="text-[10px] text-muted-foreground line-clamp-6 font-mono opacity-60 group-hover:opacity-80 transition-opacity">
                                                    {file.content || "Empty document..."}
                                                </p>

                                                {/* Favorite Button (Grid) */}
                                                <div className="absolute top-4 right-4 z-10">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className={`h-8 w-8 rounded-full hover:bg-background/80 ${file.isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
                                                        onClick={(e) => handleToggleFavorite(file, e)}
                                                    >
                                                        <Star size={16} className={file.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <div className={`flex-1 ${viewMode === 'list' ? 'flex items-center justify-between w-full ml-4 min-w-0' : 'p-4'}`}>
                                            <div className="flex items-start justify-between w-full gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {file.isTrashed && (
                                                            <span className="px-1.5 py-0.5 rounded-md bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-wider">
                                                                Trashed
                                                            </span>
                                                        )}
                                                        <h4 className={`font-semibold text-foreground group-hover:text-primary transition-colors truncate ${file.isFavorite ? 'text-yellow-500' : ''}`}>
                                                            {file.title || 'Untitled Project'}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={10} />
                                                            {formatDistanceToNow(file.lastModified, { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 shrink-0">
                                                    {viewMode === 'list' && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className={`h-8 w-8 rounded-full ${file.isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
                                                            onClick={(e) => handleToggleFavorite(file, e)}
                                                        >
                                                            <Star size={16} className={file.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                                                        </Button>
                                                    )}

                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                                    <MoreVertical size={14} />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                                                                {file.isTrashed ? (
                                                                    <>
                                                                        <DropdownMenuItem onClick={() => handleRestore(file)} className="gap-2">
                                                                            <Sparkles className="h-4 w-4" /> Restore
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-destructive focus:text-destructive gap-2" onClick={() => setFileToDelete(file.id)}>
                                                                            <Trash2 className="h-4 w-4" /> Delete Forever
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <DropdownMenuItem onClick={() => navigate(`/editor/${file.id}`)} className="gap-2">
                                                                            <FolderOpen className="h-4 w-4" /> Open
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => openRenameDialog(file)} className="gap-2">
                                                                            <Pencil className="h-4 w-4" /> Rename
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={(e) => handleToggleFavorite(file, e)} className="gap-2">
                                                                            <Star className={`h-4 w-4 ${file.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                                                            {file.isFavorite ? 'Unfavorite' : 'Favorite'}
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-destructive focus:text-destructive gap-2" onClick={() => setFileToDelete(file.id)}>
                                                                            <Trash2 className="h-4 w-4" /> Move to Trash
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Dialogs */}
            <AlertDialog open={!!fileToDelete} onOpenChange={(open) => !open && setFileToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-border/50 bg-background/95 backdrop-blur-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {files.find(f => f.id === fileToDelete)?.isTrashed ? 'Delete Forever?' : 'Move to Trash?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {files.find(f => f.id === fileToDelete)?.isTrashed
                                ? "This action cannot be undone. This will permanently delete the project."
                                : "The project will be moved to Trash. You can restore it later from the Trash tab."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl">
                            {files.find(f => f.id === fileToDelete)?.isTrashed ? 'Delete Forever' : 'Move to Trash'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={!!fileToRename} onOpenChange={(open) => !open && setFileToRename(null)}>
                <DialogContent className="rounded-3xl border-border/50 bg-background/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle>Rename Project</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter new title..."
                            className="h-12 text-lg rounded-xl"
                            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setFileToRename(null)} className="rounded-xl">Cancel</Button>
                        <Button onClick={handleRename} className="rounded-xl">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Template Selection Dialog */}
            <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
                <DialogContent className="rounded-2xl md:rounded-3xl border-border/50 bg-background/95 backdrop-blur-xl max-w-4xl w-[95vw] md:w-full max-h-[85vh] overflow-hidden flex flex-col p-0">
                    <div className="p-4 md:p-6 pb-2 border-b border-border/50">
                        <DialogHeader>
                            <DialogTitle className="text-xl md:text-2xl font-bold">Choose a Template</DialogTitle>
                            <DialogDescription className="text-xs md:text-sm">Start with a blank slate or select a template to kickstart your writing.</DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {/* Blank Project Option */}
                        <div
                            onClick={() => handleTemplateSelect('blank')}
                            className="group relative flex flex-col p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                <Plus className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors">Blank Project</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">Start from scratch with an empty document.</p>
                        </div>

                        {/* Template Options */}
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => handleTemplateSelect(template.id)}
                                className="group relative flex flex-col p-4 md:p-6 rounded-xl md:rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="h-5 w-5 md:h-6 md:w-6" />
                                </div>
                                <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors">{template.name}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-border/50 bg-muted/20 flex justify-end">
                        <Button variant="ghost" onClick={() => setIsTemplateOpen(false)} className="rounded-xl">Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
            <GitHubStarCTA />
        </div>
    );
}
