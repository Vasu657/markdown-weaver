import React from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Download,
  Copy,
  Sun,
  Moon,
  Columns,
  PanelLeft,
  PanelRight,
  FileText,
  FileCode2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ViewMode } from '@/hooks/useMarkdownEditor';

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onExport: (format: 'markdown' | 'html') => void;
  onCopy: () => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  label, 
  onClick,
  active 
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={`toolbar-btn ${active ? 'active' : ''}`}
        aria-label={label}
      >
        {icon}
      </button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <span>{label}</span>
    </TooltipContent>
  </Tooltip>
);

const Divider = () => (
  <div className="w-px h-6 bg-border mx-1" />
);

export const Toolbar: React.FC<ToolbarProps> = ({
  onInsert,
  viewMode,
  onViewModeChange,
  theme,
  onThemeToggle,
  onExport,
  onCopy,
}) => {
  const iconSize = 18;

  return (
    <div className="flex items-center gap-0.5 px-2 sm:px-3 py-2 bg-toolbar-bg border-b border-toolbar-border overflow-x-auto">
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 mr-2 sm:mr-4 flex-shrink-0">
        <FileCode2 size={22} className="text-primary" />
        <span className="font-bold text-sm sm:text-base text-foreground hidden sm:inline">MarkdownPro</span>
      </div>
      
      <Divider />
      
      {/* Headings */}
      <ToolbarButton
        icon={<Heading1 size={iconSize} />}
        label="Heading 1"
        onClick={() => onInsert('# ')}
      />
      <ToolbarButton
        icon={<Heading2 size={iconSize} />}
        label="Heading 2"
        onClick={() => onInsert('## ')}
      />
      <ToolbarButton
        icon={<Heading3 size={iconSize} />}
        label="Heading 3"
        onClick={() => onInsert('### ')}
      />
      
      <Divider />
      
      {/* Code Block */}
      <ToolbarButton
        icon={<Code size={iconSize} />}
        label="Code Block"
        onClick={() => onInsert('```\n', '\n```')}
      />
      
      <div className="flex-1" />
      
      {/* View Mode */}
      <div className="flex items-center bg-muted rounded-md p-0.5">
        <ToolbarButton
          icon={<PanelLeft size={iconSize} />}
          label="Editor Only"
          onClick={() => onViewModeChange('editor')}
          active={viewMode === 'editor'}
        />
        <ToolbarButton
          icon={<Columns size={iconSize} />}
          label="Split View"
          onClick={() => onViewModeChange('split')}
          active={viewMode === 'split'}
        />
        <ToolbarButton
          icon={<PanelRight size={iconSize} />}
          label="Preview Only"
          onClick={() => onViewModeChange('preview')}
          active={viewMode === 'preview'}
        />
      </div>
      
      <Divider />
      
      {/* Actions */}
      <ToolbarButton
        icon={theme === 'dark' ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        onClick={onThemeToggle}
      />
      
      <ToolbarButton
        icon={<Copy size={iconSize} />}
        label="Copy Markdown"
        onClick={onCopy}
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="toolbar-btn" aria-label="Export">
            <Download size={iconSize} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onExport('markdown')}>
            <FileText size={16} className="mr-2" />
            Export as Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('html')}>
            <Code size={16} className="mr-2" />
            Export as HTML
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
