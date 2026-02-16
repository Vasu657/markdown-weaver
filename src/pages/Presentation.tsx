import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { Preview } from '@/components/Preview';
import { Helmet } from 'react-helmet-async';



// Extracted Presentation View Component
export const PresentationView = ({ content, onClose }: { content: string; onClose: () => void }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);


    // Split content by "---" on its own line, allowing for whitespace
    const slides = React.useMemo(() => {
        return content.split(/^ *--- *$/m).map(s => s.trim()).filter(s => s.length > 0);
    }, [content]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };



    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
            } else if (e.key === 'ArrowLeft') {
                setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Escape') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    onClose();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length, onClose]);

    const currentSlideContent = slides[currentSlideIndex] || "# No Content\nAdd content or use `---` to separate slides.";

    // Smart Scaling Logic
    useEffect(() => {
        const calculateScale = () => {
            if (!containerRef.current || !contentRef.current) return;

            // Reset scale to 1 to get natural dimensions
            // We use a separate measurement logic or just rely on layout
            // Here we assume the content renders at its natural size (controlled by max-w prose)

            const padding = 80; // Safety margin px
            const viewportWidth = window.innerWidth - padding;
            const viewportHeight = window.innerHeight - padding;

            const contentEl = contentRef.current;
            const contentWidth = contentEl.scrollWidth;
            const contentHeight = contentEl.scrollHeight;

            // Base scale on fitting the content within the viewport
            const scaleX = viewportWidth / contentWidth;
            const scaleY = viewportHeight / contentHeight;

            // Use the smaller scale factor to ensure it fits both dimensions
            // Cap at 1.5 to prevent too much zoom on huge screens with little content
            const fitScale = Math.min(scaleX, scaleY, 2);

            // Only scale down if necessary, or scale up a bit for legibility
            setScale(fitScale);
        };

        // Run initially and on resize
        calculateScale();

        // Use ResizeObserver for more robust detection of size changes
        const observer = new ResizeObserver(calculateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        if (contentRef.current) observer.observe(contentRef.current);

        window.addEventListener('resize', calculateScale);

        return () => {
            window.removeEventListener('resize', calculateScale);
            observer.disconnect();
        };
    }, [currentSlideContent, isFullscreen]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in duration-200 overflow-hidden">
            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
                <div className="bg-muted/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium mr-2">
                    {currentSlideIndex + 1} / {Math.max(slides.length, 1)}
                </div>

                <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="rounded-full hover:bg-primary/10" title="Toggle Fullscreen">
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-destructive/10 hover:text-destructive" title="Close">
                    <X size={20} />
                </Button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center p-0 m-0 w-full h-full overflow-hidden">
                <div
                    ref={contentRef}
                    className="prose dark:prose-invert max-w-5xl w-full origin-center transition-transform duration-300 ease-out flex flex-col justify-center items-center"
                    style={{
                        transform: `scale(${scale})`,
                        // Ensure content doesn't collapse to zero width before scaling
                        minWidth: 'min(90vw, 600px)'
                    }}
                >
                    {/* Wrapper to center text content if needed, though prose usually handles block elements */}
                    <div className="w-full text-center md:text-left">
                        <Preview content={currentSlideContent} />
                    </div>
                </div>
            </div>

            {/* Navigation Areas (Clickable sides) */}
            <div
                className="absolute top-0 left-0 bottom-0 w-[10%] hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center group z-40"
                onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            >
                <ChevronLeft size={48} className="opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <div
                className="absolute top-0 right-0 bottom-0 w-[10%] hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center group z-40"
                onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1))}
            >
                <ChevronRight size={48} className="opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted w-full z-50">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentSlideIndex + 1) / Math.max(slides.length, 1)) * 100}%` }}
                />
            </div>
        </div>
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

const Presentation = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(() => {
        return localStorage.getItem('markdown-weaver-v1-content') || DEFAULT_CONTENT;
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'markdown-weaver-v1-content' && e.newValue) {
                setContent(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClose = () => {
        navigate('/');
    };

    return (
        <>
            <Helmet>
                <title>Presentation Mode - Markdown Weaver</title>
            </Helmet>
            <PresentationView content={content} onClose={handleClose} />
        </>
    );
};

export default Presentation;
