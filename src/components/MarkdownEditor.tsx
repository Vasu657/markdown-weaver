import React, { useCallback, useRef, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Upload } from 'lucide-react';
import { Toolbar } from './Toolbar';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { StatusBar } from './StatusBar';
import { SaveIndicator } from './SaveIndicator';
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import { useIsMobile } from '@/hooks/use-mobile';

const DEFAULT_CONTENT = `# Welcome to MarkdownPro

Start writing your Markdown here. This editor supports:

- **Bold** and *italic* text
- Lists, tables, and code blocks
- Math equations with LaTeX
- Mermaid diagrams

Happy writing! 🚀
`;

export const MarkdownEditor: React.FC = () => {
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
    stats,
  } = useMarkdownEditor();

  // Use mobile detection
  const isMobile = useIsMobile();

  // Automatically switch to editor-only view on mobile devices
  useEffect(() => {
    if (isMobile && viewMode === 'split') {
      setViewMode('editor');
    }
  }, [isMobile, viewMode, setViewMode]);

  // Initialize undo/redo with stored content or default
  const storedContent = localStorage.getItem('markdown-editor-content') || DEFAULT_CONTENT;
  const { content, setContent, undo, redo, canUndo, canRedo } = useUndoRedo(storedContent);
  
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const saveStatus = useAutoSave(content);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const isResizing = useRef(false);

  // Calculate stats from content
  const currentStats = React.useMemo(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characters = content.length;
    const lines = content.split('\n').length;
    return { words, characters, lines };
  }, [content]);


  const handleTemplateSelect = useCallback((templateContent: string) => {
    setContent(templateContent);
    toast({
      title: 'Template loaded!',
      description: 'Start editing your new document.',
    });
  }, [setContent, toast]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied!',
      description: 'Markdown content copied to clipboard.',
    });
  }, [content, toast]);

  const handleExport = useCallback((format: 'markdown' | 'html') => {
    if (format === 'markdown') {
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, 'document.md');
    } else {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    pre { background: #1e1e1e; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    code { font-family: 'Consolas', monospace; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    blockquote { border-left: 4px solid #0d9488; padding-left: 1rem; margin-left: 0; color: #666; }
  </style>
</head>
<body>
  ${document.querySelector('.markdown-preview')?.innerHTML || '<p>No preview available</p>'}
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      saveAs(blob, 'document.html');
    }
    toast({
      title: 'Exported!',
      description: `Document exported as ${format.toUpperCase()}.`,
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
        toast({
          title: 'File imported!',
          description: `Loaded ${file.name}`,
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please drop a .md, .markdown, or .txt file.',
        variant: 'destructive',
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

  return (
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
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        theme={theme}
        onThemeToggle={toggleTheme}
        onExport={handleExport}
        onCopy={handleCopy}
        onTemplateSelect={handleTemplateSelect}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        isMobile={isMobile}
      />
      
      <div 
        id="editor-container"
        className="flex-1 flex flex-col md:flex-row overflow-hidden relative"
      >
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
              onChange={setContent}
              fontSize={fontSize}
              showLineNumbers={showLineNumbers}
              editorRef={editorRef}
              onScroll={handleEditorScroll}
            />
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
            className={`${viewMode === 'split' ? 'h-1/2 md:h-full' : 'h-full'} overflow-hidden border-t md:border-t-0 md:border-l border-border`}
            style={{ 
              width: viewMode === 'split' ? undefined : '100%',
              flex: viewMode === 'split' ? `0 0 ${100 - splitPosition}%` : undefined,
              minWidth: viewMode === 'split' ? '150px' : undefined,
            }}
          >
            <Preview content={content} previewRef={previewRef} />
          </div>
        )}
      </div>
      
      <StatusBar
        stats={currentStats}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        showLineNumbers={showLineNumbers}
        onShowLineNumbersChange={setShowLineNumbers}
        syncScroll={syncScroll}
        onSyncScrollChange={setSyncScroll}
        saveIndicator={<SaveIndicator status={saveStatus} />}
      />
    </div>
  );
};
