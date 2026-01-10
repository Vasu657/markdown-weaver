import React from 'react';
import {
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
  Files,
  MoreHorizontal,
  Undo2,
  Redo2,
  Bell,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Share2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  onTemplateSelect: (content: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isMobile?: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (show: boolean) => void;
  syncScroll: boolean;
  onSyncScrollChange: (sync: boolean) => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  onClick,
  active,
  disabled,
  className = '',
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`toolbar-btn ${active ? 'active' : ''} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
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

// Get the next view mode in cycle: split -> editor -> preview -> split
const getNextViewMode = (current: ViewMode, isMobile?: boolean): ViewMode => {
  if (isMobile) {
    // On mobile, skip split view and cycle between editor and preview only
    switch (current) {
      case 'editor': return 'preview';
      case 'preview': return 'editor';
      default: return 'editor';
    }
  }

  // On desktop, include split view in the cycle
  switch (current) {
    case 'split': return 'editor';
    case 'editor': return 'preview';
    case 'preview': return 'split';
    default: return 'split';
  }
};

// Get icon for current view mode
const getViewModeIcon = (mode: ViewMode, size: number) => {
  switch (mode) {
    case 'split': return <Columns size={size} />;
    case 'editor': return <PanelLeft size={size} />;
    case 'preview': return <PanelRight size={size} />;
    default: return <Columns size={size} />;
  }
};

// Get label for current view mode
const getViewModeLabel = (mode: ViewMode, isMobile?: boolean): string => {
  if (isMobile) {
    // On mobile, only editor and preview modes are available
    switch (mode) {
      case 'editor': return 'Editor Only (click to switch to Preview)';
      case 'preview': return 'Preview Only (click to switch to Editor)';
      default: return 'Toggle View';
    }
  }

  // On desktop, include split view
  switch (mode) {
    case 'split': return 'Split View (click to switch to Editor)';
    case 'editor': return 'Editor Only (click to switch to Preview)';
    case 'preview': return 'Preview Only (click to switch to Split)';
    default: return 'Toggle View';
  }
};

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  theme,
  onThemeToggle,
  onExport,
  onCopy,
  onTemplateSelect,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isMobile = false,
  fontSize,
  onFontSizeChange,
  showLineNumbers,
  onShowLineNumbersChange,
  syncScroll,
  onSyncScrollChange,
}) => {
  const smallIconSize = 16;
  const navigate = useNavigate();

  const handleViewToggle = () => {
    onViewModeChange(getNextViewMode(viewMode, isMobile));
  };

  return (
    <div className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-toolbar-bg border-b border-toolbar-border">
      {/* Logo/Brand */}
      <div className="flex items-center gap-1.5 mr-1 sm:mr-3 flex-shrink-0">
        <FileCode2 size={20} className="text-primary" />
        <span className="font-bold text-sm text-foreground hidden sm:inline md:inline">Markdown Weaver</span>
      </div>

      <Divider />

      {/* Templates - Hidden on mobile */}
      <div className="hidden sm:block">
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
      </div>

      {/* Undo/Redo - Always visible */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          icon={<Undo2 size={smallIconSize} />}
          label="Undo (Ctrl+Z)"
          onClick={onUndo}
          disabled={!canUndo}
        />
        <ToolbarButton
          icon={<Redo2 size={smallIconSize} />}
          label="Redo (Ctrl+Y)"
          onClick={onRedo}
          disabled={!canRedo}
        />
      </div>

      <Divider />

      {/* View Mode Toggle */}
      <ToolbarButton
        icon={getViewModeIcon(viewMode, smallIconSize)}
        label={getViewModeLabel(viewMode, isMobile)}
        onClick={handleViewToggle}
        active={viewMode === 'split'}
      />

      <div className="flex-1" />

      {/* Notifications - Hidden on mobile */}
      <div className="hidden sm:block">
        <ToolbarButton
          icon={<Bell size={smallIconSize} />}
          label="Notifications"
          onClick={() => navigate('/notifications')}
        />
      </div>

      {/* Theme toggle */}
      <ToolbarButton
        icon={theme === 'dark' ? <Sun size={smallIconSize} /> : <Moon size={smallIconSize} />}
        label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        onClick={onThemeToggle}
      />

      {/* More actions dropdown */}
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
          {/* Mobile-specific options */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground flex items-center">
                <Files size={14} className="mr-2" />
                <span className="flex-1">Templates</span>
                <ChevronRight size={14} className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
            <DropdownMenuSeparator />
          </div>

          <DropdownMenuItem onClick={onCopy}>
            <Copy size={14} className="mr-2" />
            Copy Markdown
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground flex items-center">
              <FileText size={14} className="mr-2" />
              <span className="flex-1">Download</span>
              <ChevronRight size={14} className="ml-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onExport('markdown')}>
                <FileText size={14} className="mr-2" />
                Download as .md
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('html')}>
                <Code size={14} className="mr-2" />
                Download as HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5">
            <div className="text-xs font-medium text-muted-foreground mb-1">Font Size</div>
            <Select
              value={fontSize.toString()}
              onValueChange={(val) => onFontSizeChange(parseInt(val))}
              onOpenChange={(open) => !open}
            >
              <SelectTrigger className="h-7 w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent onPointerDownOutside={(e) => e.preventDefault()}>
                {[12, 13, 14, 15, 16, 18, 20].map(size => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            onShowLineNumbersChange(!showLineNumbers);
          }}>
            {showLineNumbers ? <ToggleRight size={14} className="mr-2" /> : <ToggleLeft size={14} className="mr-2" />}
            {showLineNumbers ? 'Hide Line Numbers' : 'Show Line Numbers'}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            onSyncScrollChange(!syncScroll);
          }}>
            {syncScroll ? <ToggleRight size={14} className="mr-2" /> : <ToggleLeft size={14} className="mr-2" />}
            {syncScroll ? 'Disable Sync Scroll' : 'Enable Sync Scroll'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/notifications')}>
            <Bell size={14} className="mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/about')}>
            <FileCode2 size={14} className="mr-2" />
            About Markdown Weaver
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/help')}>
            <HelpCircle size={14} className="mr-2" />
            Help & Syntax Guide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
