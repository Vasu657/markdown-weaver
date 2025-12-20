import { useMemo, useState, useCallback } from 'react';

export interface LintWarning {
  id: string;
  message: string;
  line: number;
  type: 'info' | 'warning';
}

const DISMISSED_STORAGE_KEY = 'markdown-pro-dismissed-hints';

export function useMarkdownLint(content: string) {
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(DISMISSED_STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const warnings = useMemo(() => {
    const lines = content.split('\n');
    const warnings: LintWarning[] = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Check for heading without space after #
      if (/^#{1,6}[^#\s]/.test(line)) {
        warnings.push({
          id: `heading-space-${lineNum}`,
          message: `Line ${lineNum}: Add a space after # in headings`,
          line: lineNum,
          type: 'warning',
        });
      }

      // Check for multiple blank lines (more than 2 consecutive)
      if (index > 1 && line === '' && lines[index - 1] === '' && lines[index - 2] === '') {
        warnings.push({
          id: `multiple-blanks-${lineNum}`,
          message: `Line ${lineNum}: Consider reducing consecutive blank lines`,
          line: lineNum,
          type: 'info',
        });
      }

      // Check for list items without space after marker
      if (/^[-*+]\S/.test(line)) {
        warnings.push({
          id: `list-space-${lineNum}`,
          message: `Line ${lineNum}: Add a space after list marker (-, *, +)`,
          line: lineNum,
          type: 'warning',
        });
      }

      // Check for trailing spaces (more than 2)
      if (/\s{3,}$/.test(line)) {
        warnings.push({
          id: `trailing-space-${lineNum}`,
          message: `Line ${lineNum}: Excessive trailing spaces`,
          line: lineNum,
          type: 'info',
        });
      }
    });

    // Filter out dismissed hints
    return warnings.filter(w => !dismissedHints.has(w.id));
  }, [content, dismissedHints]);

  const dismissHint = useCallback((id: string) => {
    setDismissedHints(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const dismissAll = useCallback(() => {
    const allIds = warnings.map(w => w.id);
    setDismissedHints(prev => {
      const newSet = new Set([...prev, ...allIds]);
      localStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  }, [warnings]);

  return { warnings, dismissHint, dismissAll };
}
