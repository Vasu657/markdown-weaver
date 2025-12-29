import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { Check, Copy } from 'lucide-react';

interface PreviewProps {
  content: string;
  previewRef?: React.RefObject<HTMLDivElement>;
  onScroll?: () => void;
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

// Copy button component for code blocks
const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
};

// Custom code block component to handle mermaid and copy button
const CodeBlock: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const isMermaid = className === 'language-mermaid';
  const code = String(children).replace(/\n$/, '');

  useEffect(() => {
    if (isMermaid && mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, code)
        .then(({ svg }) => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg;
          }
        })
        .catch(console.error);
    }
  }, [code, isMermaid]);

  if (isMermaid) {
    return <div ref={mermaidRef} className="mermaid" />;
  }

  return (
    <div className="relative group">
      <CopyButton code={code} />
      <code className={className}>
        {children}
      </code>
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({ content, previewRef }) => {
  return (
    <div
      ref={previewRef}
      className="h-full overflow-y-auto px-8 py-6 bg-preview-bg custom-scrollbar"
    >
      <article className="markdown-preview animate-fade-in">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
          components={{
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return <code {...props}>{children}</code>;
              }
              return <CodeBlock className={className}>{children}</CodeBlock>;
            },
            // Preserve HTML div elements with their attributes
            div: ({ node, ...props }) => <div {...props} />,
            // Preserve img elements with their attributes
            img: ({ node, ...props }) => <img {...props} />,
            // Preserve video elements
            video: ({ node, ...props }) => <video {...props} />,
            // Preserve anchor elements
            a: ({ node, ...props }) => <a {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};
