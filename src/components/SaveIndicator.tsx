import React from 'react';
import { Cloud, CloudOff, Check } from 'lucide-react';
import { SaveStatus } from '@/hooks/useAutoSave';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {status === 'saving' && (
        <>
          <Cloud size={12} className="animate-pulse text-primary" />
          <span>Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check size={12} className="text-primary" />
          <span>Saved</span>
        </>
      )}
      {status === 'idle' && (
        <>
          <Cloud size={12} />
          <span>Auto-save</span>
        </>
      )}
    </div>
  );
};
