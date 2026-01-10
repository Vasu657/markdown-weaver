import { useState, useEffect, useCallback } from 'react';

export type SaveStatus = 'idle' | 'saving' | 'saved';

const STORAGE_KEY = 'markdown-weaver-v1-content';

export function useAutoSave(content: string) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setSaveStatus('saving');

    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, content);
      setSaveStatus('saved');

      // Reset to idle after showing "saved"
      const resetTimeout = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);

      return () => clearTimeout(resetTimeout);
    }, 500);

    return () => clearTimeout(timeout);
  }, [content]);

  return saveStatus;
}
