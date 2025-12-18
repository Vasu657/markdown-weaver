import React from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Minus,
  Download,
  Copy,
  Sun,
  Moon,
  Columns,
  PanelLeft,
  PanelRight,
  Settings,
  FileText,
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
  DropdownMenuSeparator,
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
  shortcut?: string;
  onClick: () => void;
  active?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  label, 
  shortcut, 
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
    <TooltipContent side="bottom" className="flex items-center gap-2">
      <span>{label}</span>
      {shortcut && (
        <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded font-mono">
          {shortcut}
        </kbd>
      )}
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
    <div className="flex items-center gap-0.5 px-3 py-2 bg-toolbar-bg border-b border-toolbar-border overflow-x-auto">
      {/* Text Formatting */}
      <ToolbarButton
        icon={<Bold size={iconSize} />}
        label="Bold"
        shortcut="Ctrl+B"
        onClick={() => onInsert('**', '**')}
      />
      <ToolbarButton
        icon={<Italic size={iconSize} />}
        label="Italic"
        shortcut="Ctrl+I"
        onClick={() => onInsert('*', '*')}
      />
      <ToolbarButton
        icon={<Strikethrough size={iconSize} />}
        label="Strikethrough"
        onClick={() => onInsert('~~', '~~')}
      />
      
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
      
      {/* Lists */}
      <ToolbarButton
        icon={<List size={iconSize} />}
        label="Unordered List"
        onClick={() => onInsert('- ')}
      />
      <ToolbarButton
        icon={<ListOrdered size={iconSize} />}
        label="Ordered List"
        onClick={() => onInsert('1. ')}
      />
      <ToolbarButton
        icon={<CheckSquare size={iconSize} />}
        label="Task List"
        onClick={() => onInsert('- [ ] ')}
      />
      
      <Divider />
      
      {/* Blocks */}
      <ToolbarButton
        icon={<Quote size={iconSize} />}
        label="Blockquote"
        onClick={() => onInsert('> ')}
      />
      <ToolbarButton
        icon={<Code size={iconSize} />}
        label="Code Block"
        onClick={() => onInsert('```\n', '\n```')}
      />
      <ToolbarButton
        icon={<Table size={iconSize} />}
        label="Table"
        onClick={() => onInsert('| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |')}
      />
      <ToolbarButton
        icon={<Minus size={iconSize} />}
        label="Horizontal Rule"
        onClick={() => onInsert('\n---\n')}
      />
      
      <Divider />
      
      {/* Links & Images */}
      <ToolbarButton
        icon={<Link size={iconSize} />}
        label="Link"
        shortcut="Ctrl+K"
        onClick={() => onInsert('[', '](url)')}
      />
      <ToolbarButton
        icon={<Image size={iconSize} />}
        label="Image"
        onClick={() => onInsert('![alt text](', ')')}
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
