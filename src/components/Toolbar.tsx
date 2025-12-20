import React from 'react';
import {
  Download,
  Copy,
  Sun,
  Moon,
  Columns,
  PanelLeft,
  PanelRight,
  FileText,
  FileCode2,
  Code,
  HelpCircle,
  Share2,
  Focus,
  Sparkles,
  Files,
  MoreHorizontal,
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ViewMode } from '@/hooks/useMarkdownEditor';
import { useNavigate } from 'react-router-dom';
import { templates } from '@/lib/templates';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onExport: (format: 'markdown' | 'html') => void;
  onCopy: () => void;
  onShare: () => void;
  onTemplateSelect: (content: string) => void;
  focusMode: boolean;
  onFocusModeToggle: () => void;
  zenMode: boolean;
  onZenModeToggle: () => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  label, 
  onClick,
  active,
  className = '',
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={`toolbar-btn ${active ? 'active' : ''} ${className}`}
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
  <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
);

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  theme,
  onThemeToggle,
  onExport,
  onCopy,
  onShare,
  onTemplateSelect,
  focusMode,
  onFocusModeToggle,
  zenMode,
  onZenModeToggle,
}) => {
  const iconSize = 18;
  const smallIconSize = 16;
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-toolbar-bg border-b border-toolbar-border">
      {/* Logo/Brand */}
      <div className="flex items-center gap-1.5 mr-1 sm:mr-3 flex-shrink-0">
        <FileCode2 size={20} className="text-primary" />
        <span className="font-bold text-sm text-foreground hidden md:inline">MarkdownPro</span>
      </div>
      
      <Divider />
      
      {/* Templates - Always visible */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="toolbar-btn" aria-label="Templates">
                <Files size={smallIconSize} />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Templates</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start" className="w-56">
          {templates.map((template) => (
            <DropdownMenuItem 
              key={template.id}
              onClick={() => onTemplateSelect(template.content)}
              className="flex items-start gap-2"
            >
              <FileText size={14} className="mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm">{template.name}</span>
                <span className="text-xs text-muted-foreground">{template.description}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* View Mode - Compact on mobile */}
      <div className="flex items-center bg-muted rounded-md p-0.5">
        <ToolbarButton
          icon={<PanelLeft size={smallIconSize} />}
          label="Editor Only"
          onClick={() => onViewModeChange('editor')}
          active={viewMode === 'editor'}
        />
        <ToolbarButton
          icon={<Columns size={smallIconSize} />}
          label="Split View"
          onClick={() => onViewModeChange('split')}
          active={viewMode === 'split'}
          className="hidden xs:flex"
        />
        <ToolbarButton
          icon={<PanelRight size={smallIconSize} />}
          label="Preview Only"
          onClick={() => onViewModeChange('preview')}
          active={viewMode === 'preview'}
        />
      </div>
      
      {/* Focus Modes - Hidden on mobile, shown in More menu */}
      <div className="hidden sm:flex items-center gap-0.5">
        <ToolbarButton
          icon={<Focus size={smallIconSize} />}
          label="Focus Mode"
          onClick={onFocusModeToggle}
          active={focusMode}
        />
        <ToolbarButton
          icon={<Sparkles size={smallIconSize} />}
          label="Zen Mode"
          onClick={onZenModeToggle}
          active={zenMode}
        />
      </div>
      
      <div className="flex-1" />
      
      {/* Theme toggle - Always visible */}
      <ToolbarButton
        icon={theme === 'dark' ? <Sun size={smallIconSize} /> : <Moon size={smallIconSize} />}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        onClick={onThemeToggle}
      />
      
      {/* More actions dropdown - Contains share, copy, export on mobile */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="toolbar-btn" aria-label="More actions">
                <MoreHorizontal size={smallIconSize} />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">More</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-48">
          {/* Mobile-only options */}
          <DropdownMenuItem onClick={onFocusModeToggle} className="sm:hidden">
            <Focus size={14} className="mr-2" />
            Focus Mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onZenModeToggle} className="sm:hidden">
            <Sparkles size={14} className="mr-2" />
            Zen Mode
          </DropdownMenuItem>
          <DropdownMenuSeparator className="sm:hidden" />
          
          {/* Always visible options */}
          <DropdownMenuItem onClick={onShare}>
            <Share2 size={14} className="mr-2" />
            Share Preview Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopy}>
            <Copy size={14} className="mr-2" />
            Copy Markdown
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onExport('markdown')}>
            <FileText size={14} className="mr-2" />
            Export as Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('html')}>
            <Code size={14} className="mr-2" />
            Export as HTML
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/help')}>
            <HelpCircle size={14} className="mr-2" />
            Help & Syntax Guide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
