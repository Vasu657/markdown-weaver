import React from 'react';
import { Suggestion } from '@/hooks/useSuggestions';

interface SuggestionPopupProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (suggestion: Suggestion) => void;
  onHover: (index: number) => void;
  position: { top: number; left: number };
}

export const SuggestionPopup: React.FC<SuggestionPopupProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  onHover,
  position,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div
      className="absolute z-50 min-w-48 max-w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border bg-muted">
        Suggestions • Tab to insert
      </div>
      <div className="max-h-48 overflow-y-auto custom-scrollbar">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.id}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
              index === selectedIndex
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-muted'
            }`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => onHover(index)}
          >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-muted text-xs font-mono">
              {suggestion.category === 'syntax' ? '#' : '¶'}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{suggestion.label}</div>
              {suggestion.description && (
                <div className="text-xs text-muted-foreground truncate">
                  {suggestion.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
