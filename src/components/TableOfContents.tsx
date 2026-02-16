import React, { useEffect, useState, useRef } from 'react';
import { slugify } from './Preview';
import { cn } from '@/lib/utils';
import { ScrollText, ChevronRight, List, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableOfContentsProps {
    content: string;
    previewRef: React.RefObject<HTMLDivElement>;
    editorRef?: React.RefObject<HTMLTextAreaElement>;
    fontSize?: number;
    syncScroll?: boolean;
}

interface TOCItem {
    id: string;
    text: string;
    level: number;
    lineIndex: number;
}

interface Position {
    x: number;
    y: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
    content,
    previewRef,
    editorRef,
    fontSize = 14,
    syncScroll = true,
}) => {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [buttonPosition, setButtonPosition] = useState<Position>({ x: 0, y: 16 });
    const [tocPosition, setTocPosition] = useState<Position>({ x: 0, y: 72 });
    const [isDraggingButton, setIsDraggingButton] = useState(false);
    const [isDraggingToc, setIsDraggingToc] = useState(false);
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const tocRef = useRef<HTMLDivElement>(null);

    // Parse headers from content
    useEffect(() => {
        const lines = content.split('\n');
        const headers: TOCItem[] = [];
        let inCodeBlock = false;

        lines.forEach((line, index) => {
            // Skip code blocks
            if (line.trim().startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                return;
            }
            if (inCodeBlock) return;

            // Match headers
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = slugify(text);
                headers.push({ id, text, level, lineIndex: index });
            }
        });

        setItems(headers);
    }, [content]);

    // Track active header based on scroll
    useEffect(() => {
        const container = previewRef.current;
        if (!container) return;

        const handleScroll = () => {
            const headingElements = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            let currentActiveId = '';
            const offset = 100;
            const containerRect = container.getBoundingClientRect();

            for (const heading of headingElements) {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= containerRect.top + offset) {
                    currentActiveId = heading.id;
                } else {
                    break;
                }
            }

            // Check if we're at the bottom of the content
            const isAtBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 50;
            if (isAtBottom && headingElements.length > 0) {
                currentActiveId = headingElements[headingElements.length - 1].id;
            }

            if (currentActiveId) {
                setActiveId(currentActiveId);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [items, previewRef]);

    const scrollToHeader = (id: string, lineIndex: number, e: React.MouseEvent) => {
        e.preventDefault();
        console.log('scrollToHeader', { id, lineIndex, syncScroll, hasPreview: !!previewRef.current, hasEditor: !!editorRef?.current });

        // Scroll Preview
        const element = previewRef.current?.querySelector(`[id="${id}"]`) || document.getElementById(id);
        if (element) {
            const container = previewRef.current;
            if (container) {
                container.scrollTo({
                    top: (element as HTMLElement).offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        }

        // Scroll Editor
        if (syncScroll && editorRef?.current) {
            const textarea = editorRef.current;

            // Create a mirror element to calculate the height of the text up to the line
            const mirror = document.createElement('div');
            const style = window.getComputedStyle(textarea);

            // Copy styles to mirror
            Array.from(style).forEach((key) => {
                mirror.style.setProperty(key, style.getPropertyValue(key), style.getPropertyPriority(key));
            });

            // Force specific styles for accurate measurement
            mirror.style.position = 'absolute';
            mirror.style.top = '-9999px';
            mirror.style.left = '-9999px';
            mirror.style.visibility = 'hidden';
            mirror.style.height = 'auto';
            mirror.style.minHeight = '0';
            mirror.style.overflow = 'hidden';
            mirror.style.width = `${textarea.clientWidth}px`; // Use clientWidth to exclude scrollbar

            // We split by \n in the effect. Let's do the same here to be consistent.
            const lines = content.split('\n');
            const precedingText = lines.slice(0, lineIndex).join('\n') + '\n';

            mirror.textContent = precedingText;

            document.body.appendChild(mirror);
            const targetHeight = mirror.scrollHeight;
            document.body.removeChild(mirror);

            mirror.style.padding = '0';
            mirror.style.border = 'none';

            const paddingBottom = parseFloat(style.paddingBottom);

            editorRef.current.scrollTo({
                top: targetHeight - paddingBottom,
                behavior: 'smooth'
            });
        }
    };

    // Drag handlers for button
    const handleButtonMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.button !== 0) return; // Only left click
        setIsDraggingButton(true);
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect && previewRef.current) {
            const previewRect = previewRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - (previewRect.left + buttonPosition.x),
                y: e.clientY - (previewRect.top + buttonPosition.y)
            });
        }
        e.preventDefault();
    };

    const handleButtonTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        const touch = e.touches[0];
        setIsDraggingButton(true);
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect && previewRef.current) {
            const previewRect = previewRef.current.getBoundingClientRect();
            setDragOffset({
                x: touch.clientX - (previewRect.left + buttonPosition.x),
                y: touch.clientY - (previewRect.top + buttonPosition.y)
            });
        }
    };

    // Drag handlers for TOC
    const handleTocMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return; // Only left click
        // Only allow dragging from the header
        const target = e.target as HTMLElement;
        const headerElement = target.closest('[data-toc-header]');
        if (!headerElement) return;

        setIsDraggingToc(true);
        const rect = tocRef.current?.getBoundingClientRect();
        if (rect && previewRef.current) {
            const previewRect = previewRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - (previewRect.left + tocPosition.x),
                y: e.clientY - (previewRect.top + tocPosition.y)
            });
        }
        e.preventDefault();
    };

    const handleTocTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // Only allow dragging from the header
        const target = e.target as HTMLElement;
        const headerElement = target.closest('[data-toc-header]');
        if (!headerElement) return;

        const touch = e.touches[0];
        setIsDraggingToc(true);
        const rect = tocRef.current?.getBoundingClientRect();
        if (rect && previewRef.current) {
            const previewRect = previewRef.current.getBoundingClientRect();
            setDragOffset({
                x: touch.clientX - (previewRect.left + tocPosition.x),
                y: touch.clientY - (previewRect.top + tocPosition.y)
            });
        }
    };

    // Mouse and touch move handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!previewRef.current) return;
            const previewRect = previewRef.current.getBoundingClientRect();

            if (isDraggingButton && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                let newX = e.clientX - previewRect.left - dragOffset.x;
                let newY = e.clientY - previewRect.top - dragOffset.y;

                // Constrain to preview panel
                newX = Math.max(0, Math.min(newX, previewRect.width - buttonRect.width));
                newY = Math.max(0, Math.min(newY, previewRect.height - buttonRect.height));

                setButtonPosition({ x: newX, y: newY });
            }

            if (isDraggingToc && tocRef.current) {
                const tocRect = tocRef.current.getBoundingClientRect();
                let newX = e.clientX - previewRect.left - dragOffset.x;
                let newY = e.clientY - previewRect.top - dragOffset.y;

                // Constrain to preview panel
                newX = Math.max(0, Math.min(newX, previewRect.width - tocRect.width));
                newY = Math.max(0, Math.min(newY, previewRect.height - tocRect.height));

                setTocPosition({ x: newX, y: newY });
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!previewRef.current) return;
            const touch = e.touches[0];
            const previewRect = previewRef.current.getBoundingClientRect();

            if (isDraggingButton && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                let newX = touch.clientX - previewRect.left - dragOffset.x;
                let newY = touch.clientY - previewRect.top - dragOffset.y;

                // Constrain to preview panel
                newX = Math.max(0, Math.min(newX, previewRect.width - buttonRect.width));
                newY = Math.max(0, Math.min(newY, previewRect.height - buttonRect.height));

                setButtonPosition({ x: newX, y: newY });
            }

            if (isDraggingToc && tocRef.current) {
                const tocRect = tocRef.current.getBoundingClientRect();
                let newX = touch.clientX - previewRect.left - dragOffset.x;
                let newY = touch.clientY - previewRect.top - dragOffset.y;

                // Constrain to preview panel
                newX = Math.max(0, Math.min(newX, previewRect.width - tocRect.width));
                newY = Math.max(0, Math.min(newY, previewRect.height - tocRect.height));

                setTocPosition({ x: newX, y: newY });
            }
            e.preventDefault();
        };

        const handleMouseUp = () => {
            setIsDraggingButton(false);
            setIsDraggingToc(false);
        };

        const handleTouchEnd = () => {
            setIsDraggingButton(false);
            setIsDraggingToc(false);
        };

        if (isDraggingButton || isDraggingToc) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDraggingButton, isDraggingToc, dragOffset, buttonPosition, tocPosition]);

    if (items.length === 0) return null;

    return (
        <>
            {/* Floating Trigger Button - Now Draggable */}
            <Button
                ref={buttonRef}
                variant="outline"
                size="icon"
                className={cn(
                    "absolute z-50 h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur hover:bg-background transition-none",
                    isDraggingButton ? "cursor-grabbing" : "cursor-grab"
                )}
                style={{
                    left: `${buttonPosition.x}px`,
                    top: `${buttonPosition.y}px`,
                    right: 'auto',
                }}
                onMouseDown={handleButtonMouseDown}
                onTouchStart={handleButtonTouchStart}
                onClick={(e) => {
                    // Only toggle if not dragging
                    if (!isDraggingButton) {
                        setIsOpen(!isOpen);
                    }
                }}
                title="Table of Contents (Drag to move)"
            >
                {isOpen ? <ChevronRight size={16} /> : <List size={16} />}
            </Button>

            {/* Sidebar - Now Draggable */}
            <div
                ref={tocRef}
                className={cn(
                    "absolute z-40 transition-opacity duration-300 flex flex-col",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                style={{
                    left: `${tocPosition.x}px`,
                    top: `${tocPosition.y}px`,
                    right: 'auto',
                }}
                onMouseDown={handleTocMouseDown}
                onTouchStart={handleTocTouchStart}
            >
                <div className={cn(
                    "bg-background/95 backdrop-blur shadow-lg border rounded-xl overflow-hidden flex flex-col max-h-[70vh] w-64",
                    isDraggingToc ? "cursor-grabbing" : ""
                )}>
                    <div
                        data-toc-header
                        className={cn(
                            "p-3 border-b bg-muted/40 flex items-center justify-between",
                            isDraggingToc ? "cursor-grabbing" : "cursor-grab"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <ScrollText className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-semibold">On this page</h3>
                        </div>
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="overflow-y-auto p-2 custom-scrollbar flex-1">
                        <div className="flex flex-col gap-1">
                            {items.map((item, index) => (
                                <a
                                    key={`${item.id}-${index}`}
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollToHeader(item.id, item.lineIndex, e)}
                                    className={cn(
                                        "text-sm py-1.5 px-2 rounded-md transition-colors block truncate",
                                        item.level === 1 ? "" :
                                            item.level === 2 ? "pl-4" :
                                                item.level === 3 ? "pl-6" : "pl-8",

                                        activeId === item.id
                                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary rounded-l-none"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                    title={item.text}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
