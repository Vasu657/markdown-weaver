import { useState, useCallback, useRef, useEffect } from 'react';

interface HistoryState {
  past: string[];
  present: string;
  future: string[];
}

const MAX_HISTORY = 100;
const DEBOUNCE_MS = 500;

export const useUndoRedo = (initialContent: string) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialContent,
    future: [],
  });
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef(initialContent);

  const pushToHistory = useCallback((newContent: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (newContent !== lastSavedRef.current) {
        setHistory(prev => ({
          past: [...prev.past.slice(-(MAX_HISTORY - 1)), prev.present],
          present: newContent,
          future: [],
        }));
        lastSavedRef.current = newContent;
      }
    }, DEBOUNCE_MS);
  }, []);

  const setContent = useCallback((newContent: string) => {
    setHistory(prev => ({
      ...prev,
      present: newContent,
    }));
    pushToHistory(newContent);
  }, [pushToHistory]);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;
      
      const newPast = [...prev.past];
      const previous = newPast.pop()!;
      
      lastSavedRef.current = previous;
      
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      
      const [next, ...newFuture] = prev.future;
      
      lastSavedRef.current = next;
      
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return {
    content: history.present,
    setContent,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
