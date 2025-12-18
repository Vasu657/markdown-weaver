import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';

interface PreviewProps {
  content: string;
  previewRef: React.RefObject<HTMLDivElement>;
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

// Custom code block component to handle mermaid
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
    <code className={className}>
      {children}
    </code>
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
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
          components={{
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return <code {...props}>{children}</code>;
              }
              return <CodeBlock className={className}>{children}</CodeBlock>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};
