import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { Check, Copy } from 'lucide-react';

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

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
      className="absolute top-2 right-2 p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all opacity-100"
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
      mermaid.render(`mermaid-${Math.random().toString(36).slice(2, 11)}`, code)
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
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = previewRef?.current?.querySelector(`[id="${targetId}"]`) ||
        document.querySelector(`[id="${targetId}"]`);

      if (targetElement) {
        const container = previewRef?.current || window;
        const offset = (targetElement as HTMLElement).offsetTop;

        if (container === window) {
          window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
          container.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }
  }, [previewRef]);

  const extractText = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.map(extractText).join('');
    }
    if (React.isValidElement(children)) {
      return extractText(children.props.children);
    }
    return '';
  };

  const SourceLineWrapper = ({ node, children, ...props }: any) => {
    const line = node?.position?.start?.line;
    return React.cloneElement(children as React.ReactElement, {
      ...props,
      'data-source-line': line,
    });
  };

  const createHeadingRenderer = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    return ({ node, children, ...props }: any) => {
      const text = extractText(children);
      const id = slugify(text);
      const line = node?.position?.start?.line;

      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      return <HeadingTag id={id} data-source-line={line} {...props}>{children}</HeadingTag>;
    };
  };

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
            code: ({ className, children, node, ...props }) => {
              const ruleProps = { 'data-source-line': node?.position?.start?.line };
              const isInline = !className;
              if (isInline) {
                return <code {...props} {...ruleProps}>{children}</code>;
              }
              return (
                <div {...ruleProps}>
                  <CodeBlock className={className}>{children}</CodeBlock>
                </div>
              );
            },
            p: ({ node, ...props }) => <p data-source-line={node?.position?.start?.line} {...props} />,
            ul: ({ node, ...props }) => <ul data-source-line={node?.position?.start?.line} {...props} />,
            ol: ({ node, ...props }) => <ol data-source-line={node?.position?.start?.line} {...props} />,
            li: ({ node, ...props }) => <li data-source-line={node?.position?.start?.line} {...props} />,
            blockquote: ({ node, ...props }) => <blockquote data-source-line={node?.position?.start?.line} {...props} />,
            pre: ({ node, ...props }) => <pre data-source-line={node?.position?.start?.line} {...props} />,
            div: ({ node, ...props }) => <div data-source-line={node?.position?.start?.line} {...props} />,
            img: ({ node, ...props }) => <img data-source-line={node?.position?.start?.line} {...props} />,
            video: ({ node, ...props }) => <video data-source-line={node?.position?.start?.line} {...props} />,
            a: ({ node, ...props }) => (
              <a data-source-line={node?.position?.start?.line} {...props} onClick={handleAnchorClick} />
            ),
            h1: createHeadingRenderer(1),
            h2: createHeadingRenderer(2),
            h3: createHeadingRenderer(3),
            h4: createHeadingRenderer(4),
            h5: createHeadingRenderer(5),
            h6: createHeadingRenderer(6),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};
