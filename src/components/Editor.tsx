import React, { useCallback, KeyboardEvent } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  fontSize: number;
  showLineNumbers: boolean;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  onScroll: () => void;
  onInsert: (before: string, after?: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  fontSize,
  showLineNumbers,
  editorRef,
  onScroll,
  onInsert,
}) => {
  const lines = content.split('\n');
  const lineCount = lines.length;

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          onInsert('**', '**');
          break;
        case 'i':
          e.preventDefault();
          onInsert('*', '*');
          break;
        case 'k':
          e.preventDefault();
          onInsert('[', '](url)');
          break;
      }
    }

    // Handle Tab for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      onChange(newContent);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  }, [content, onChange, onInsert]);

  return (
    <div className="flex h-full bg-editor-bg">
      {showLineNumbers && (
        <div 
          className="flex-shrink-0 select-none text-right pr-3 pl-3 py-4 bg-editor-gutter text-editor-lineNumber font-mono border-r border-border"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>
      )}
      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        onKeyDown={handleKeyDown}
        className="editor-textarea px-4 py-4 custom-scrollbar"
        style={{ fontSize: `${fontSize}px` }}
        spellCheck={false}
        placeholder="Start writing your Markdown here..."
        aria-label="Markdown editor"
      />
    </div>
  );
};
