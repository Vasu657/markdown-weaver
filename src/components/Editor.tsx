import React, { useCallback, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { SuggestionPopup } from './SuggestionPopup';
import { useSuggestions, Suggestion } from '@/hooks/useSuggestions';

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
  
  const [cursorPosition, setCursorPosition] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    suggestions,
    isVisible,
    selectedIndex,
    showSuggestions,
    hideSuggestions,
    selectNext,
    selectPrevious,
    getSelectedSuggestion,
    setSelectedIndex,
  } = useSuggestions(content, cursorPosition);

  // Calculate popup position based on cursor
  const updatePopupPosition = useCallback(() => {
    const textarea = editorRef.current;
    if (!textarea || !containerRef.current) return;

    const { selectionStart } = textarea;
    const textBeforeCursor = content.substring(0, selectionStart);
    const lines = textBeforeCursor.split('\n');
    const currentLineIndex = lines.length - 1;
    const lineHeight = fontSize * 1.7;
    
    // Calculate approximate position
    const top = Math.min(
      (currentLineIndex + 1) * lineHeight + 16,
      containerRef.current.clientHeight - 200
    );
    const left = Math.min(
      (lines[currentLineIndex]?.length || 0) * (fontSize * 0.6) + (showLineNumbers ? 60 : 16),
      containerRef.current.clientWidth - 280
    );
    
    setPopupPosition({ top: Math.max(top, 50), left: Math.max(left, 16) });
  }, [content, fontSize, editorRef, showLineNumbers]);

  // Track cursor position
  const handleSelect = useCallback(() => {
    const textarea = editorRef.current;
    if (textarea) {
      setCursorPosition(textarea.selectionStart);
      updatePopupPosition();
    }
  }, [editorRef, updatePopupPosition]);

  // Show suggestions on certain triggers
  const handleInput = useCallback(() => {
    handleSelect();
    showSuggestions();
  }, [handleSelect, showSuggestions]);

  // Hide suggestions on blur
  const handleBlur = useCallback(() => {
    // Delay to allow click on suggestion
    setTimeout(hideSuggestions, 150);
  }, [hideSuggestions]);

  // Insert suggestion
  const insertSuggestion = useCallback((suggestion: Suggestion) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = content.substring(0, start);
    const afterCursor = content.substring(start);
    
    // Find where to insert - remove trigger character if present
    const triggers = ['#', '*', '`', '[', '$', '-', '>', '|'];
    let insertStart = start;
    const lastChar = beforeCursor.slice(-1);
    
    if (triggers.includes(lastChar)) {
      insertStart = start - 1;
    }
    
    // Check for multiple trigger chars like ## or **
    const lastTwo = beforeCursor.slice(-2);
    if (['##', '**', '``', '$$'].some(t => lastTwo.endsWith(t))) {
      insertStart = start - 2;
    }
    const lastThree = beforeCursor.slice(-3);
    if (lastThree === '###' || lastThree === '```' || lastThree === '$$$') {
      insertStart = start - 3;
    }

    const newContent = content.substring(0, insertStart) + suggestion.value + afterCursor;
    onChange(newContent);
    
    // Position cursor appropriately
    setTimeout(() => {
      const newPosition = insertStart + suggestion.value.length;
      textarea.selectionStart = textarea.selectionEnd = newPosition;
      textarea.focus();
    }, 0);

    hideSuggestions();
  }, [content, onChange, editorRef, hideSuggestions]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle suggestion navigation
    if (isVisible && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectNext();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectPrevious();
        return;
      }
      if (e.key === 'Tab' || e.key === 'Enter') {
        const selected = getSelectedSuggestion();
        if (selected) {
          e.preventDefault();
          insertSuggestion(selected);
          return;
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        hideSuggestions();
        return;
      }
    }

    // Handle Tab for indentation
    if (e.key === 'Tab' && !isVisible) {
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
  }, [content, onChange, isVisible, suggestions, selectNext, selectPrevious, getSelectedSuggestion, insertSuggestion, hideSuggestions]);

  return (
    <div ref={containerRef} className="flex h-full bg-editor-bg relative">
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
        onChange={(e) => {
          onChange(e.target.value);
          handleInput();
        }}
        onScroll={onScroll}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onBlur={handleBlur}
        onFocus={showSuggestions}
        className="editor-textarea px-4 py-4 custom-scrollbar"
        style={{ fontSize: `${fontSize}px` }}
        spellCheck={false}
        placeholder="Start writing your Markdown here..."
        aria-label="Markdown editor"
      />
      
      {/* Suggestion Popup */}
      {isVisible && (
        <SuggestionPopup
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={insertSuggestion}
          onHover={setSelectedIndex}
          position={popupPosition}
        />
      )}
    </div>
  );
};
