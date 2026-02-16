import * as React from "react"
import {
    Settings,
    FileText,
    FileCode,
    Columns,
    PanelLeft,
    PanelRight,
    Network,
    Sun,
    Moon,
    Copy,
    Home,
    MessageSquare,
    MonitorPlay,
    ArrowLeft
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import { useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"
import { ViewMode } from "@/hooks/useMarkdownEditor"

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExport: (format: 'markdown' | 'html') => void;
    onCopy: () => void;
    setViewMode: (mode: ViewMode) => void;
    toggleChat: () => void;
    togglePresentation: () => void;
}

export function CommandPalette({
    open,
    onOpenChange,
    onExport,
    onCopy,
    setViewMode,
    toggleChat,
    togglePresentation
}: CommandPaletteProps) {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(!open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [onOpenChange, open])

    const runCommand = React.useCallback((command: () => unknown) => {
        onOpenChange(false)
        command()
    }, [onOpenChange])

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => runCommand(onCopy)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy to Clipboard</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(toggleChat)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Toggle AI Chat</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="View Modes">
                    <CommandItem onSelect={() => runCommand(() => setViewMode('editor'))}>
                        <PanelLeft className="mr-2 h-4 w-4" />
                        <span>Editor Only</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setViewMode('split'))}>
                        <Columns className="mr-2 h-4 w-4" />
                        <span>Split View</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setViewMode('preview'))}>
                        <PanelRight className="mr-2 h-4 w-4" />
                        <span>Preview Only</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => setViewMode('mindmap'))}>
                        <Network className="mr-2 h-4 w-4" />
                        <span>Mind Map</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(togglePresentation)}>
                        <MonitorPlay className="mr-2 h-4 w-4" />
                        <span>Presentation Mode</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="File Actions">
                    <CommandItem onSelect={() => runCommand(() => onExport('markdown'))}>
                        <FileCode className="mr-2 h-4 w-4" />
                        <span>Export as Markdown</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => onExport('html'))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Export as HTML</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Go to Dashboard</span>
                    </CommandItem>
                    {/* Settings needs dialog trigger, omitting for now or can route to /settings if it existed */}
                </CommandGroup>

                <CommandGroup heading="Appearance">
                    <CommandItem onSelect={() => runCommand(toggleTheme)}>
                        {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                        <span>Toggle Theme</span>
                    </CommandItem>
                </CommandGroup>

            </CommandList>
        </CommandDialog>
    )
}
