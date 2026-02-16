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
  Bell,
  ChevronLeft,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Share2,
  Settings,
  Sparkles,
  Wand2,
  MessageSquare,
  Loader2,
  User,
  MonitorPlay,
  Network,
  ScrollText,
  Keyboard,
  Terminal,
} from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';
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


interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  // ... existing props
  onBack?: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onExport: (format: 'markdown' | 'html') => void;
  onCopy: () => void;
  onTemplateSelect: (content: string) => void;
  isMobile?: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (show: boolean) => void;
  syncScroll: boolean;
  onSyncScrollChange: (sync: boolean) => void;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
  onMagicAction?: (action: 'autocomplete' | 'grammar' | 'clarity' | 'tone_professional' | 'tone_casual') => void;
  isGenerating?: boolean;
  onTogglePresentation?: () => void;
  isPresentationMode?: boolean;
  isPresentationLoading?: boolean;
  onOpenCommandPalette?: () => void;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

// Helper Components & Functions
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

// Get the next view mode in cycle: split -> editor -> preview -> mindmap -> split
const getNextViewMode = (current: ViewMode, isMobile?: boolean): ViewMode => {
  if (isMobile) {
    // On mobile: editor -> preview -> mindmap -> editor
    switch (current) {
      case 'editor': return 'preview';
      case 'preview': return 'mindmap';
      case 'mindmap': return 'editor';
      default: return 'editor';
    }
  }

  // On desktop
  switch (current) {
    case 'split': return 'editor';
    case 'editor': return 'preview';
    case 'preview': return 'mindmap';
    case 'mindmap': return 'split';
    default: return 'split';
  }
};

// Get icon for current view mode
const getViewModeIcon = (mode: ViewMode, size: number) => {
  switch (mode) {
    case 'split': return <Columns size={size} />;
    case 'editor': return <PanelLeft size={size} />;
    case 'preview': return <PanelRight size={size} />;
    case 'mindmap': return <Network size={size} />;
    default: return <Columns size={size} />;
  }
};

// Get label for current view mode
const getViewModeLabel = (mode: ViewMode, isMobile?: boolean): string => {
  if (isMobile) {
    switch (mode) {
      case 'editor': return 'Editor Only';
      case 'preview': return 'Preview Only';
      case 'mindmap': return 'Mind Map View';
      default: return 'Toggle View';
    }
  }

  switch (mode) {
    case 'split': return 'Split View';
    case 'editor': return 'Editor Only';
    case 'preview': return 'Preview Only';
    case 'mindmap': return 'Mind Map View';
    default: return 'Toggle View';
  }
};

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  onBack,
  theme,
  // ... existing destructuring
  onThemeToggle,
  onExport,
  onCopy,
  onTemplateSelect,
  isMobile = false,
  fontSize,
  onFontSizeChange,
  showLineNumbers,
  onShowLineNumbersChange,
  syncScroll,
  onSyncScrollChange,
  onToggleChat,
  isChatOpen,
  onMagicAction,
  isGenerating,
  onTogglePresentation,
  isPresentationMode,
  isPresentationLoading,
  onOpenCommandPalette,
}) => {
  const smallIconSize = 16;
  const navigate = useNavigate();

  // ... hooks ...
  const [displayedViewMode, setDisplayedViewMode] = React.useState<ViewMode>(viewMode);
  const [isPaused, setIsPaused] = React.useState(false);
  const activityTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isPaused) {
      setDisplayedViewMode(viewMode);
    }
  }, [viewMode, isPaused]);

  // ... interaction handlers ...
  // (Assuming identical implementation to original)
  React.useEffect(() => {
    const handleInteraction = () => {
      setIsPaused(true);
      setDisplayedViewMode(viewMode);

      if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
      activityTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
    };
  }, [viewMode]);

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDisplayedViewMode(current => getNextViewMode(current, isMobile));
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, isMobile]);


  const handleViewToggle = () => {
    if (!isPaused) {
      return;
    }
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

      {/* View Mode Toggle */}
      <ToolbarButton
        icon={getViewModeIcon(displayedViewMode, smallIconSize)}
        label={getViewModeLabel(displayedViewMode, isMobile)}
        onClick={handleViewToggle}
        active={viewMode === 'split'}
      />

      {onTogglePresentation && (
        <div className="hidden sm:block">
          <ToolbarButton
            icon={isPresentationLoading ? <Loader2 size={smallIconSize} className="animate-spin" /> : <MonitorPlay size={smallIconSize} />}
            label="AI Presentation Mode"
            onClick={onTogglePresentation}
            active={isPresentationMode}
            disabled={isPresentationLoading}
          />
        </div>
      )}

      {onOpenCommandPalette && (
        <ToolbarButton
          icon={<span className="font-mono font-bold text-xs">⌘</span>}
          label="Command Palette (Ctrl+K)"
          onClick={onOpenCommandPalette}
        />
      )}


      <Divider />

      <div className="flex-1" />



      {/* Chat Button */}
      {onToggleChat && (
        <ToolbarButton
          icon={<MessageSquare size={smallIconSize} />}
          label="AI Chat Assistant"
          onClick={onToggleChat}
          active={isChatOpen}
          className={isChatOpen ? "text-primary" : ""}
        />
      )}

      <Divider />

      {/* Notifications - Hidden on mobile */}
      <div className="hidden sm:block">
        <ToolbarButton
          icon={<Bell size={smallIconSize} />}
          label="Notifications"
          onClick={() => navigate('/notifications')}
        />
      </div>

      <div className="hidden sm:block">
        <SettingsDialog trigger={
          <div className='inline-flex'>
            <ToolbarButton
              icon={<Settings size={smallIconSize} />}
              label="AI Settings"
              onClick={() => { }}
            />
          </div>
        } />
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
          {/* Back to Dashboard - Show when available */}
          {onBack && (
            <>
              <DropdownMenuItem onClick={onBack}>
                <ChevronLeft size={14} className="mr-2" />
                Back to Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Mobile-specific options */}
          <div className="sm:hidden">
            {/* Mobile Settings */}
            <SettingsDialog trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Settings size={14} className="mr-2" />
                AI Settings
              </DropdownMenuItem>
            } />
            <DropdownMenuSeparator />
            {onTogglePresentation && (
              <>
                <DropdownMenuItem onClick={onTogglePresentation}>
                  <MonitorPlay size={14} className="mr-2" />
                  AI Presentation Mode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {onOpenCommandPalette && (
              <>
                <DropdownMenuItem onClick={onOpenCommandPalette}>
                  <Terminal size={14} className="mr-2" />
                  Command Palette
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
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
            About
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
