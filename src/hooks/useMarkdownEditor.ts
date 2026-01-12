import { useState, useCallback, useEffect, useRef } from 'react';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Weaver Editor

A powerful, real-time Markdown editor with live preview.

## Features

- **Real-time preview** with GitHub-Flavored Markdown
- **Syntax highlighting** for code blocks
- **Math equations** using LaTeX
- **Diagrams** using Mermaid
- **Tables, task lists**, and more!

## Getting Started

Start typing in the editor on the left to see your changes appear in the preview on the right.

### Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Math Equations

Inline math: $E = mc^2$

Block math:

$$
\\frac{n!}{k!(n-k)!} = \\binom{n}{k}
$$

### Task List

- [x] Create the editor
- [x] Add live preview
- [ ] Export to PDF
- [ ] Share your work

### Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Editor | ✅ Done | High |
| Preview | ✅ Done | High |
| Export | 🚧 WIP | Medium |

### Blockquote

> "The best way to predict the future is to create it."
> — Peter Drucker

---

**Happy writing!** 🚀
`;

const STORAGE_KEY = 'markdown-pro-content';

export type ViewMode = 'split' | 'editor' | 'preview';

export function useMarkdownEditor() {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || DEFAULT_MARKDOWN;
  });

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [syncScroll, setSyncScroll] = useState(true);

  // Note: Auto-save is now handled by useAutoSave hook in MarkdownEditor

  const handleEditorScroll = useCallback(() => {
    if (!syncScroll || !editorRef.current || !previewRef.current) return;

    const editor = editorRef.current;

    // Calculate current line number based on scroll position
    // We assume a fixed line height for simplicity in the editor, which is common for code editors
    // If wrapping is heavily used, this is an approximation
    const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 24;
    const currentLine = Math.floor(editor.scrollTop / lineHeight) + 1; // +1 because markdown lines are 1-indexed

    // Find the element in the preview that corresponds to this line
    const preview = previewRef.current;
    const elements = Array.from(preview.querySelectorAll('[data-source-line]'));

    // Find the element with the closest source line <= currentLine
    let targetElement: HTMLElement | null = null;
    let minDiff = Infinity;

    for (const el of elements) {
      const sourceLine = parseInt(el.getAttribute('data-source-line') || '0', 10);
      if (!isNaN(sourceLine)) {
        // We prefer the element that starts right at or slightly before our line
        if (sourceLine >= currentLine) {
          // If we found a line that is >= currentLine, this is likely our target or slightly after
          const diff = sourceLine - currentLine;
          if (diff < minDiff) {
            minDiff = diff;
            targetElement = el as HTMLElement;
          }
          // Optimization: if exact match, break
          if (diff === 0) break;
        }
      }
    }

    // Fallback: if we are at the end of the document, or couldn't find a close match forward,
    // look backwards for the last element before currentLine
    if (!targetElement) {
      let maxLine = -1;
      for (const el of elements) {
        const sourceLine = parseInt(el.getAttribute('data-source-line') || '0', 10);
        if (sourceLine < currentLine && sourceLine > maxLine) {
          maxLine = sourceLine;
          targetElement = el as HTMLElement;
        }
      }
    }


    if (targetElement) {
      // Smooth scroll to the element
      // We adjust offsetTop by the container's offsetTop to find relative position
      targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else if (editor.scrollTop === 0) {
      preview.scrollTop = 0;
    }
  }, [syncScroll]);

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const newContent =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newContent);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  }, [content]);

  const stats = {
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    characters: content.length,
    lines: content.split('\n').length,
  };

  return {
    content,
    setContent,
    viewMode,
    setViewMode,
    showLineNumbers,
    setShowLineNumbers,
    fontSize,
    setFontSize,
    editorRef,
    previewRef,
    syncScroll,
    setSyncScroll,
    handleEditorScroll,
    insertText,
    stats,
  };
}
