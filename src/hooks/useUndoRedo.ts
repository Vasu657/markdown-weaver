import { useState, useCallback, useRef, useEffect } from 'react';

interface HistoryState {
  past: string[];
  present: string;
  future: string[];
}

const MAX_HISTORY = 100;
const DEBOUNCE_MS = 300;
const BATCH_MS = 50;

export const useUndoRedo = (initialContent: string) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialContent,
    future: [],
  });
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const batchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef(initialContent);
  const isUndoRedoRef = useRef(false);
  const pendingContentRef = useRef<string | null>(null);

  // Commit pending content to history
  const commitToHistory = useCallback((newContent: string) => {
    if (newContent !== lastSavedRef.current && !isUndoRedoRef.current) {
      setHistory(prev => ({
        past: [...prev.past.slice(-(MAX_HISTORY - 1)), lastSavedRef.current],
        present: newContent,
        future: [],
      }));
      lastSavedRef.current = newContent;
    }
    pendingContentRef.current = null;
  }, []);

  const setContent = useCallback((newContent: string) => {
    // Prevent undo/redo from creating history entries
    if (isUndoRedoRef.current) {
      setHistory(prev => ({
        ...prev,
        present: newContent,
      }));
      return;
    }

    // Update present immediately for responsive UI
    setHistory(prev => ({
      ...prev,
      present: newContent,
    }));

    pendingContentRef.current = newContent;

    // Clear existing timers
    if (batchRef.current) clearTimeout(batchRef.current);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Batch rapid changes (typing)
    batchRef.current = setTimeout(() => {
      // Debounce to commit after pause in typing
      debounceRef.current = setTimeout(() => {
        if (pendingContentRef.current !== null) {
          commitToHistory(pendingContentRef.current);
        }
      }, DEBOUNCE_MS);
    }, BATCH_MS);
  }, [commitToHistory]);

  const undo = useCallback(() => {
    // Commit any pending changes first
    if (pendingContentRef.current !== null && pendingContentRef.current !== lastSavedRef.current) {
      commitToHistory(pendingContentRef.current);
    }
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (batchRef.current) clearTimeout(batchRef.current);

    setHistory(prev => {
      if (prev.past.length === 0) return prev;
      
      const newPast = [...prev.past];
      const previous = newPast.pop()!;
      
      isUndoRedoRef.current = true;
      lastSavedRef.current = previous;
      
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
      
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future.slice(0, MAX_HISTORY - 1)],
      };
    });
  }, [commitToHistory]);

  const redo = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (batchRef.current) clearTimeout(batchRef.current);

    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      
      const [next, ...newFuture] = prev.future;
      
      isUndoRedoRef.current = true;
      lastSavedRef.current = next;
      
      setTimeout(() => {
        isUndoRedoRef.current = false;
      }, 0);
      
      return {
        past: [...prev.past.slice(-(MAX_HISTORY - 1)), prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // Keyboard shortcuts with proper event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTextarea = target.tagName === 'TEXTAREA';
      
      // Only handle if we're in the editor textarea
      if (!isTextarea) return;
      
      // Undo: Ctrl+Z (not Shift)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        undo();
        return;
      }
      
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey) || (e.key === 'Z' && e.shiftKey))) {
        e.preventDefault();
        e.stopPropagation();
        redo();
        return;
      }
    };

    // Use capture phase to intercept before browser default
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [undo, redo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (batchRef.current) clearTimeout(batchRef.current);
    };
  }, []);

  return {
    content: history.present,
    setContent,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
