import { useState, useCallback, useMemo, useEffect } from 'react';

export interface Suggestion {
  id: string;
  label: string;
  value: string;
  description?: string;
  category: 'syntax' | 'word' | 'structure';
}

const SYNTAX_SUGGESTIONS: Suggestion[] = [
  { id: 'h1', label: '# Heading 1', value: '# ', description: 'Large heading', category: 'syntax' },
  { id: 'h2', label: '## Heading 2', value: '## ', description: 'Medium heading', category: 'syntax' },
  { id: 'h3', label: '### Heading 3', value: '### ', description: 'Small heading', category: 'syntax' },
  { id: 'bold', label: '**Bold**', value: '**text**', description: 'Bold text', category: 'syntax' },
  { id: 'italic', label: '*Italic*', value: '*text*', description: 'Italic text', category: 'syntax' },
  { id: 'code', label: '`Code`', value: '`code`', description: 'Inline code', category: 'syntax' },
  { id: 'codeblock', label: '```Code Block```', value: '```\n\n```', description: 'Code block', category: 'syntax' },
  { id: 'link', label: '[Link](url)', value: '[text](url)', description: 'Hyperlink', category: 'syntax' },
  { id: 'image', label: '![Image](url)', value: '![alt](url)', description: 'Image', category: 'syntax' },
  { id: 'list', label: '- List item', value: '- ', description: 'Bullet list', category: 'syntax' },
  { id: 'numlist', label: '1. Numbered', value: '1. ', description: 'Numbered list', category: 'syntax' },
  { id: 'task', label: '- [ ] Task', value: '- [ ] ', description: 'Task item', category: 'syntax' },
  { id: 'quote', label: '> Quote', value: '> ', description: 'Blockquote', category: 'syntax' },
  { id: 'hr', label: '---', value: '---\n', description: 'Horizontal rule', category: 'syntax' },
  { id: 'table', label: 'Table', value: '| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |', description: 'Table', category: 'syntax' },
  { id: 'math', label: '$Math$', value: '$equation$', description: 'Inline math', category: 'syntax' },
  { id: 'mathblock', label: '$$Math Block$$', value: '$$\n\n$$', description: 'Math block', category: 'syntax' },
];

const STRUCTURE_SUGGESTIONS: Suggestion[] = [
  { id: 'section', label: 'New Section', value: '\n## Section Title\n\n', description: 'Add a new section', category: 'structure' },
  { id: 'paragraph', label: 'Paragraph', value: '\n\n', description: 'New paragraph', category: 'structure' },
];

export function useSuggestions(content: string, cursorPosition: number) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get context around cursor
  const context = useMemo(() => {
    const beforeCursor = content.substring(0, cursorPosition);
    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1] || '';
    const lastWord = currentLine.split(/\s/).pop() || '';
    
    return {
      currentLine,
      lastWord,
      isStartOfLine: currentLine.trim() === '' || currentLine === lastWord,
      isAfterHash: /^#{1,6}$/.test(currentLine.trim()),
    };
  }, [content, cursorPosition]);

  // Generate suggestions based on context
  const suggestions = useMemo(() => {
    const { currentLine, lastWord, isStartOfLine, isAfterHash } = context;
    
    // Don't show if we're in the middle of writing
    if (lastWord.length > 0 && lastWord.length < 2 && !isAfterHash) {
      return [];
    }

    let filtered: Suggestion[] = [];

    // At start of line - show syntax suggestions
    if (isStartOfLine) {
      filtered = SYNTAX_SUGGESTIONS.filter(s => 
        s.id.startsWith('h') || s.id === 'list' || s.id === 'numlist' || 
        s.id === 'task' || s.id === 'quote' || s.id === 'codeblock'
      );
    }
    
    // After # - show heading completions
    if (isAfterHash) {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id.startsWith('h'));
    }

    // If typing special characters
    if (lastWord === '*' || lastWord === '**') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'bold' || s.id === 'italic');
    }

    if (lastWord === '`') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'code' || s.id === 'codeblock');
    }

    if (lastWord === '[') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'link' || s.id === 'image');
    }

    if (lastWord === '$') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'math' || s.id === 'mathblock');
    }

    if (lastWord === '-') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'list' || s.id === 'task' || s.id === 'hr');
    }

    if (lastWord === '>') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'quote');
    }

    if (lastWord === '|') {
      filtered = SYNTAX_SUGGESTIONS.filter(s => s.id === 'table');
    }

    // Empty line after content - show structure suggestions
    if (currentLine === '' && content.trim().length > 0) {
      filtered = [...STRUCTURE_SUGGESTIONS, ...SYNTAX_SUGGESTIONS.slice(0, 4)];
    }

    return filtered.slice(0, 6);
  }, [context, content]);

  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  const showSuggestions = useCallback(() => {
    if (suggestions.length > 0) {
      setIsVisible(true);
    }
  }, [suggestions]);

  const hideSuggestions = useCallback(() => {
    setIsVisible(false);
    setSelectedIndex(0);
  }, []);

  const selectNext = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % suggestions.length);
  }, [suggestions.length]);

  const selectPrevious = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
  }, [suggestions.length]);

  const getSelectedSuggestion = useCallback(() => {
    return suggestions[selectedIndex] || null;
  }, [suggestions, selectedIndex]);

  return {
    suggestions,
    isVisible: isVisible && suggestions.length > 0,
    selectedIndex,
    showSuggestions,
    hideSuggestions,
    selectNext,
    selectPrevious,
    getSelectedSuggestion,
    setSelectedIndex,
  };
}
