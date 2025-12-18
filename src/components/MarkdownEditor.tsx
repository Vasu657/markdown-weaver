import React, { useCallback, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { Upload } from 'lucide-react';
import { Toolbar } from './Toolbar';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { StatusBar } from './StatusBar';
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

export const MarkdownEditor: React.FC = () => {
  const {
    content,
    setContent,
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
    insertText,
    stats,
  } = useMarkdownEditor();

  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const isResizing = useRef(false);

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
      // Simple HTML export
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

  React.useEffect(() => {
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
      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm border-2 border-dashed border-primary rounded-lg m-4">
          <div className="flex flex-col items-center gap-3 text-primary">
            <Upload size={48} />
            <p className="text-lg font-medium">Drop your Markdown file here</p>
          </div>
        </div>
      )}
      
      {/* Toolbar */}
      <Toolbar
        onInsert={insertText}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        theme={theme}
        onThemeToggle={toggleTheme}
        onExport={handleExport}
        onCopy={handleCopy}
      />
      
      {/* Main editor area */}
      <div 
        id="editor-container"
        className="flex-1 flex flex-col md:flex-row overflow-hidden"
      >
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div 
            className="h-1/2 md:h-full overflow-hidden"
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
              onInsert={insertText}
            />
          </div>
        )}
        
        {viewMode === 'split' && (
          <div
            className="resize-handle hidden md:block"
            onMouseDown={handleMouseDown}
            role="separator"
            aria-label="Resize editor and preview"
          />
        )}
        
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div 
            className="h-1/2 md:h-full overflow-hidden border-t md:border-t-0 md:border-l border-border"
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
      
      {/* Status bar */}
      <StatusBar
        stats={stats}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        showLineNumbers={showLineNumbers}
        onShowLineNumbersChange={setShowLineNumbers}
        syncScroll={syncScroll}
        onSyncScrollChange={setSyncScroll}
      />
    </div>
  );
};
