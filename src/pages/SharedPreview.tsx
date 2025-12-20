import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, FileCode2 } from 'lucide-react';
import { Preview } from '@/components/Preview';
import { decodeSharedContent } from '@/lib/shareUtils';

const SharedPreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const encodedContent = searchParams.get('content') || '';

  const content = useMemo(() => {
    return decodeSharedContent(encodedContent);
  }, [encodedContent]);

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <FileCode2 size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground mb-2">No Content Found</h1>
          <p className="text-muted-foreground mb-6">
            This preview link is empty or invalid.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} />
            Go to Editor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 bg-muted border-b border-border">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <FileCode2 size={22} className="text-primary" />
        <span className="font-bold text-foreground">MarkdownPro Preview</span>
        <span className="text-xs text-muted-foreground ml-2">(Read-only)</span>
      </header>
      <div className="flex-1 overflow-auto">
        <Preview content={content} />
      </div>
    </div>
  );
};

export default SharedPreview;
