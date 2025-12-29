import React from 'react';
import { FileText, Hash, Type, ToggleLeft, ToggleRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StatusBarProps {
  stats: {
    words: number;
    characters: number;
    lines: number;
  };
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (show: boolean) => void;
  syncScroll: boolean;
  onSyncScrollChange: (sync: boolean) => void;
  saveIndicator?: React.ReactNode;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  stats,
  fontSize,
  onFontSizeChange,
  showLineNumbers,
  onShowLineNumbersChange,
  syncScroll,
  onSyncScrollChange,
  saveIndicator,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted border-t border-border text-xs text-muted-foreground gap-1 sm:gap-4 overflow-x-auto whitespace-nowrap">
      {/* Stats */}
      <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
        {saveIndicator}
        
        <div className="w-px h-4 bg-border hidden sm:block" />
        
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
      
      {/* Controls */}
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <button
          onClick={() => onShowLineNumbersChange(!showLineNumbers)}
          className="flex items-center gap-0.5 hover:text-foreground transition-colors flex-shrink-0"
          title="Toggle line numbers"
        >
          {showLineNumbers ? <ToggleRight size={12} className="text-primary sm:w-3.5 sm:h-3.5" /> : <ToggleLeft size={12} className="sm:w-3.5 sm:h-3.5" />}
        </button>
        
        <button
          onClick={() => onSyncScrollChange(!syncScroll)}
          className="flex items-center gap-0.5 hover:text-foreground transition-colors flex-shrink-0"
          title="Toggle sync scroll"
        >
          {syncScroll ? <ToggleRight size={12} className="text-primary sm:w-3.5 sm:h-3.5" /> : <ToggleLeft size={12} className="sm:w-3.5 sm:h-3.5" />}
        </button>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <Select 
            value={fontSize.toString()} 
            onValueChange={(val) => onFontSizeChange(parseInt(val))}
          >
            <SelectTrigger className="h-6 sm:h-7 w-12 sm:w-16 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[12, 13, 14, 15, 16, 18, 20].map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Privacy Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate('/privacy')}
              className="flex items-center gap-0.5 hover:text-foreground transition-colors flex-shrink-0"
              title="Privacy & Legal"
            >
              <Shield size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Privacy & Legal</TooltipContent>
        </Tooltip>
        
        {/* Developed by */}
        <div className="hidden md:flex items-center gap-1 text-muted-foreground/70 border-l border-border pl-2 flex-shrink-0">
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
      </div>
    </div>
  );
};
