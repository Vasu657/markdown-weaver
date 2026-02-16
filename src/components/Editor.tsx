import React, { useCallback, KeyboardEvent, useRef, useEffect, useMemo } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  fontSize: number;
  showLineNumbers: boolean;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  onScroll: () => void;
  onInteraction?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSelect?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
}

const LineNumbers = React.memo(({ count, fontSize }: { count: number; fontSize: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <div key={i + 1}>{i + 1}</div>
    ))}
  </>
));

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  fontSize,
  showLineNumbers,
  editorRef,
  onScroll,
  onInteraction,
  onUndo,
  onRedo,
  onSelect,
  onMouseUp,
}) => {
  const lineCount = useMemo(() => content.split('\n').length, [content]);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Undo/Redo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        onRedo?.();
      } else {
        onUndo?.();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
      e.preventDefault();
      onRedo?.();
      return;
    }

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
  }, [content, onChange, onUndo, onRedo]);

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
          <LineNumbers count={lineCount} fontSize={fontSize} />
        </div>
      )}
      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => {
          onChange(e.target.value);
          onSelect?.(e);
        }}
        onScroll={handleScroll}
        onWheel={onInteraction}
        onTouchStart={onInteraction}
        onMouseDown={onInteraction}
        onMouseUp={onMouseUp}
        onKeyDown={handleKeyDown}
        onSelect={onSelect}
        onClick={onSelect} // Also trigger on click to update cursor position if needed
        onKeyUp={onSelect} // Trigger on key up to catch arrow keys
        className="editor-textarea px-4 py-4 custom-scrollbar flex-1"
        style={{ fontSize: `${fontSize}px` }}
        spellCheck={false}
        placeholder="Start writing your Markdown here..."
        aria-label="Markdown editor"
      />
    </div>
  );
};
