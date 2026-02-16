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

export type ViewMode = 'split' | 'editor' | 'preview' | 'mindmap';

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

  const targetPreviewScrollTop = useRef(0);
  const targetEditorScrollTop = useRef(0);
  const isPreviewScrolling = useRef(false);
  const isEditorScrolling = useRef(false);

  const performSmoothPreviewScroll = useCallback(() => {
    if (!previewRef.current || !isPreviewScrolling.current) return;

    const currentScrollTop = previewRef.current.scrollTop;
    const target = targetPreviewScrollTop.current;

    const diff = target - currentScrollTop;

    // Threshold to stop animation
    if (Math.abs(diff) < 1) {
      previewRef.current.scrollTop = target;
      // Delay releasing the lock slightly to let final scroll events flush
      setTimeout(() => {
        isPreviewScrolling.current = false;
      }, 50);
      return;
    }

    // Linear interpolation (Lerp)
    const newScrollTop = currentScrollTop + diff * 0.15;
    previewRef.current.scrollTop = newScrollTop;

    requestAnimationFrame(performSmoothPreviewScroll);
  }, []);

  const performSmoothEditorScroll = useCallback(() => {
    if (!editorRef.current || !isEditorScrolling.current) return;

    const currentScrollTop = editorRef.current.scrollTop;
    const target = targetEditorScrollTop.current;
    const diff = target - currentScrollTop;

    if (Math.abs(diff) < 1) {
      editorRef.current.scrollTop = target;
      setTimeout(() => {
        isEditorScrolling.current = false;
      }, 50);
      return;
    }

    const newScrollTop = currentScrollTop + diff * 0.15;
    editorRef.current.scrollTop = newScrollTop;

    requestAnimationFrame(performSmoothEditorScroll);
  }, []);

  const handleEditorScroll = useCallback(() => {
    if (!syncScroll || !editorRef.current || !previewRef.current) return;

    // Prevent loop: if editor is being scrolled BY the preview sync, don't sync back to preview
    if (isEditorScrolling.current) return;

    const editor = editorRef.current;
    const preview = previewRef.current;

    // Calculate target scroll position based on percentage
    // ratio = editorScroll / editorMax
    // previewTarget = ratio * previewMax
    const editorMax = editor.scrollHeight - editor.clientHeight;
    const previewMax = preview.scrollHeight - preview.clientHeight;

    if (editorMax <= 0 || previewMax <= 0) return;

    const percentage = editor.scrollTop / editorMax;
    const newScrollTop = percentage * previewMax;

    targetPreviewScrollTop.current = newScrollTop;

    if (!isPreviewScrolling.current) {
      isPreviewScrolling.current = true;
      requestAnimationFrame(performSmoothPreviewScroll);
    }
  }, [syncScroll, performSmoothPreviewScroll]);

  const handlePreviewScroll = useCallback(() => {
    if (!syncScroll || !editorRef.current || !previewRef.current) return;

    // Prevent loop: if preview is being scrolled BY the editor sync, don't sync back to editor
    if (isPreviewScrolling.current) return;

    const editor = editorRef.current;
    const preview = previewRef.current;

    const editorMax = editor.scrollHeight - editor.clientHeight;
    const previewMax = preview.scrollHeight - preview.clientHeight;

    if (editorMax <= 0 || previewMax <= 0) return;

    const percentage = preview.scrollTop / previewMax;
    const newScrollTop = percentage * editorMax;

    targetEditorScrollTop.current = newScrollTop;

    if (!isEditorScrolling.current) {
      isEditorScrolling.current = true;
      requestAnimationFrame(performSmoothEditorScroll);
    }
  }, [syncScroll, performSmoothEditorScroll]);

  const handleEditorInteraction = useCallback(() => {
    isEditorScrolling.current = false;
  }, []);

  const handlePreviewInteraction = useCallback(() => {
    isPreviewScrolling.current = false;
  }, []);

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
    handlePreviewScroll,
    handleEditorInteraction,
    handlePreviewInteraction,
    insertText,
    stats,
  };
}
