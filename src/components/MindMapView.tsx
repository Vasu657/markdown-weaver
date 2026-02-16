import React, { useRef, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react';

interface MindMapViewProps {
    content: string;
    theme: 'light' | 'dark';
}

export const MindMapView: React.FC<MindMapViewProps> = ({ content, theme }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const mmRef = useRef<Markmap | null>(null);
    const transformer = React.useMemo(() => new Transformer(), []);

    useEffect(() => {
        if (mmRef.current) return;
        if (svgRef.current) {
            mmRef.current = Markmap.create(svgRef.current);
        }
    }, []);

    useEffect(() => {
        if (!mmRef.current || !content) return;

        // Transform markdown to markmap data
        const { root } = transformer.transform(content);

        // Manually force style update on the SVG container
        if (svgRef.current) {
            svgRef.current.style.color = theme === 'dark' ? '#e5e7eb' : '#333';
            const styleId = 'markmap-theme-styles';
            let styleEl = document.getElementById(styleId) as HTMLStyleElement;
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = styleId;
                document.head.appendChild(styleEl);
            }
            styleEl.innerHTML = `
            .markmap-node-text { fill: ${theme === 'dark' ? '#e5e7eb' : '#333'} !important; }
            .markmap-link { stroke: ${theme === 'dark' ? '#4b5563' : '#d1d5db'}; }
            .markmap-node-circle { stroke: ${theme === 'dark' ? '#9ca3af' : '#6b7280'}; }
        `;
        }

        // Render
        mmRef.current.setData(root);

        // Fit to window with a slight delay
        setTimeout(() => {
            mmRef.current?.fit();
        }, 100);

    }, [content, transformer, theme]);

    useEffect(() => {
        const handleResize = () => {
            if (mmRef.current) {
                mmRef.current.fit();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleZoomIn = () => {
        if (mmRef.current) {
            mmRef.current.rescale(1.25);
        }
    };

    const handleZoomOut = () => {
        if (mmRef.current) {
            mmRef.current.rescale(0.8);
        }
    };

    const handleFit = () => {
        if (mmRef.current) {
            mmRef.current.fit();
        }
    };

    const handleDownload = () => {
        if (svgRef.current) {
            const svgData = new XMLSerializer().serializeToString(svgRef.current);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            saveAs(blob, 'mindmap.svg');
        }
    };

    return (
        <div className="w-full h-full bg-background overflow-hidden relative animate-in fade-in duration-300 group">
            <svg ref={svgRef} className="w-full h-full" />

            {/* Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-background/80 backdrop-blur border rounded-md shadow-sm p-1 flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={handleZoomIn} title="Zoom In">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={handleZoomOut} title="Zoom Out">
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={handleFit} title="Fit to Screen">
                        <Maximize className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={handleDownload} title="Download SVG">
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
