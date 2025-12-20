import React from 'react';
import { AlertTriangle, Info, X, XCircle } from 'lucide-react';
import { LintWarning } from '@/hooks/useMarkdownLint';

interface LintPanelProps {
  warnings: LintWarning[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}

export const LintPanel: React.FC<LintPanelProps> = ({
  warnings,
  onDismiss,
  onDismissAll,
}) => {
  if (warnings.length === 0) return null;

  return (
    <div className="absolute bottom-4 right-4 max-w-xs bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in z-10">
      <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">
          Markdown Tips ({warnings.length})
        </span>
        <button
          onClick={onDismissAll}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss all"
        >
          <XCircle size={14} />
        </button>
      </div>
      <div className="max-h-32 overflow-y-auto custom-scrollbar">
        {warnings.slice(0, 3).map((warning) => (
          <div
            key={warning.id}
            className="flex items-start gap-2 px-3 py-2 text-xs border-b border-border last:border-0"
          >
            {warning.type === 'warning' ? (
              <AlertTriangle size={12} className="text-yellow-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Info size={12} className="text-blue-500 flex-shrink-0 mt-0.5" />
            )}
            <span className="flex-1 text-muted-foreground">{warning.message}</span>
            <button
              onClick={() => onDismiss(warning.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
