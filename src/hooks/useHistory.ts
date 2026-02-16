import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
    past: T[];
    present: T;
    future: T[];
}

export interface UseHistoryReturn<T> {
    state: T;
    set: (newPresent: T, type?: 'rewrite' | 'type') => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    clear: (initialState: T) => void;
}

export function useHistory<T>(initialState: T): UseHistoryReturn<T> {
    const [history, setHistory] = useState<HistoryState<T>>({
        past: [],
        present: initialState,
        future: [],
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const canUndo = history.past.length > 0;
    const canRedo = history.future.length > 0;

    const undo = useCallback(() => {
        setHistory((curr) => {
            if (curr.past.length === 0) return curr;

            const previous = curr.past[curr.past.length - 1];
            const newPast = curr.past.slice(0, curr.past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [curr.present, ...curr.future],
            };
        });
    }, []);

    const redo = useCallback(() => {
        setHistory((curr) => {
            if (curr.future.length === 0) return curr;

            const next = curr.future[0];
            const newFuture = curr.future.slice(1);

            return {
                past: [...curr.past, curr.present],
                present: next,
                future: newFuture,
            };
        });
    }, []);

    const set = useCallback((newPresent: T, type: 'rewrite' | 'type' = 'rewrite') => {
        if (type === 'rewrite') {
            // Immediate snapshot for major changes (AI, paste, etc.)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            setHistory((curr) => {
                if (curr.present === newPresent) return curr;
                return {
                    past: [...curr.past, curr.present],
                    present: newPresent,
                    future: [],
                };
            });
        } else {
            // Debounced snapshot for typing
            // We start a timer. If typing continues within 1s, we update 'present' but don't clear 'future' or push 'past' yet?
            // Wait, 'future' MUST be cleared on new input.
            // The goal of debouncing is to group rapid keystrokes into one undo step.

            if (timeoutRef.current) {
                // Continue current session: update present, extend timer.
                setHistory((curr) => ({
                    ...curr,
                    present: newPresent,
                    future: [], // Clear redo stack as user diverged history
                }));

                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    timeoutRef.current = null;
                }, 1000);
            } else {
                // Start new session: push old state to past, update present, start timer.
                setHistory((curr) => ({
                    past: [...curr.past, curr.present],
                    present: newPresent,
                    future: [],
                }));

                timeoutRef.current = setTimeout(() => {
                    timeoutRef.current = null;
                }, 1000);
            }
        }
    }, []);

    const clear = useCallback((initialState: T) => {
        setHistory({
            past: [],
            present: initialState,
            future: []
        });
    }, []);

    return {
        state: history.present,
        set,
        undo,
        redo,
        canUndo,
        canRedo,
        clear
    };
}
