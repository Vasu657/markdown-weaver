import React, { useCallback, KeyboardEvent, useRef, useEffect } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  fontSize: number;
  showLineNumbers: boolean;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  onScroll: () => void;
}

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  fontSize,
  showLineNumbers,
  editorRef,
  onScroll,
}) => {
  const lines = content.split('\n');
  const lineCount = lines.length;
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
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
  }, [content, onChange]);

  const handleScroll = useCallback(() => {
    if (editorRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
    }
    onScroll();
  }, [editorRef, onScroll]);

  return (
    <div className="flex h-full bg-editor-bg relative overflow-hidden">
      {showLineNumbers && (
        <div 
          ref={lineNumbersRef}
          className="flex-shrink-0 select-none text-right pr-3 pl-3 py-4 bg-editor-gutter text-editor-lineNumber font-mono border-r border-border overflow-hidden"
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
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="editor-textarea px-4 py-4 custom-scrollbar flex-1"
        style={{ fontSize: `${fontSize}px` }}
        spellCheck={false}
        placeholder="Start writing your Markdown here..."
        aria-label="Markdown editor"
      />
    </div>
  );
};
