import React from 'react';
import { FileText, Hash, Type, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatusBarProps {
  stats: {
    words: number;
    characters: number;
    lines: number;
  };
  saveIndicator?: React.ReactNode;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  stats,
  saveIndicator,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-t border-border text-xs text-muted-foreground gap-1 sm:gap-4 overflow-x-auto whitespace-nowrap">
      {/* Stats */}
      <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
        {/* Save indicator and divider on desktop */}
        <div className="hidden md:flex items-center gap-1 sm:gap-4">
          {saveIndicator}
          <div className="w-px h-4 bg-border" />
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Type size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="whitespace-nowrap">{stats.words}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Word count</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Hash size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="whitespace-nowrap">{stats.characters}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Character count</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <FileText size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="whitespace-nowrap">{stats.lines}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Line count</TooltipContent>
        </Tooltip>
      </div>
      
      {/* Right section: Privacy/Developer on desktop, save on mobile */}
      <div className="flex items-center gap-1 text-muted-foreground/70 border-l border-border pl-2 flex-shrink-0">
        {/* Desktop: Privacy + Developer */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate('/privacy')}
            className="flex items-center gap-1 hover:text-foreground transition-colors text-xs"
            title="Privacy & Legal"
          >
            <Shield size={12} className="w-3.5 h-3.5" />
            <span>Privacy</span>
          </button>
          <span className="text-xs">by</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline text-xs"
          >
            Vasu Ghanta ❤️
          </a>
        </div>
        
        {/* Mobile: Auto save indicator */}
        <div className="md:hidden">
          {saveIndicator}
        </div>
      </div>
    </div>
  );
};