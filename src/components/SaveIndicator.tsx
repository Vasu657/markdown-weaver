import React from 'react';
import { Cloud, Check } from 'lucide-react';
import { SaveStatus } from '@/hooks/useAutoSave';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ status }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {status === 'saving' && (
            <>
              <Cloud size={14} className="animate-pulse text-primary flex-shrink-0" />
              <span className="hidden sm:inline">Saving...</span>
            </>
          )}
          {status === 'saved' && (
            <>
              <Check size={14} className="text-primary flex-shrink-0" />
              <span className="hidden sm:inline">Saved</span>
            </>
          )}
          {status === 'idle' && (
            <>
              <Cloud size={14} className="flex-shrink-0" />
              <span className="hidden sm:inline">Auto-save</span>
            </>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {status === 'saving' && 'Saving...'}
        {status === 'saved' && 'Saved'}
        {status === 'idle' && 'Auto-save enabled'}
      </TooltipContent>
    </Tooltip>
  );
};
