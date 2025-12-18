import React from 'react';
import { FileText, Hash, Type, ToggleLeft, ToggleRight } from 'lucide-react';
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
}

export const StatusBar: React.FC<StatusBarProps> = ({
  stats,
  fontSize,
  onFontSizeChange,
  showLineNumbers,
  onShowLineNumbersChange,
  syncScroll,
  onSyncScrollChange,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-muted border-t border-border text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Type size={14} />
              <span>{stats.words} words</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Word count</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Hash size={14} />
              <span>{stats.characters} chars</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Character count</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <FileText size={14} />
              <span>{stats.lines} lines</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Line count</TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => onShowLineNumbersChange(!showLineNumbers)}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          {showLineNumbers ? <ToggleRight size={14} className="text-primary" /> : <ToggleLeft size={14} />}
          <span>Line numbers</span>
        </button>
        
        <button
          onClick={() => onSyncScrollChange(!syncScroll)}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          {syncScroll ? <ToggleRight size={14} className="text-primary" /> : <ToggleLeft size={14} />}
          <span>Sync scroll</span>
        </button>
        
        <div className="flex items-center gap-2">
          <span>Font size:</span>
          <Select 
            value={fontSize.toString()} 
            onValueChange={(val) => onFontSizeChange(parseInt(val))}
          >
            <SelectTrigger className="h-7 w-16 text-xs">
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
      </div>
    </div>
  );
};
