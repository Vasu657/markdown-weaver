
import React, { useState, useEffect } from 'react';
import { Settings, Loader2, AlertCircle, CheckCircle2, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OpenRouterService, OpenRouterModel } from '@/lib/ai-service';
import { useToast } from '@/hooks/use-toast';
import { exportData, importData } from '@/lib/export_import';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { useRef } from 'react';

interface SettingsDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
    open,
    onOpenChange,
    trigger
}) => {
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState<OpenRouterModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isInfoExpanded, setIsInfoExpanded] = useState(false);
    const [enableToc, setEnableToc] = useState(true);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showImportConfirm, setShowImportConfirm] = useState(false);
    const [fileToImport, setFileToImport] = useState<File | null>(null);

    useEffect(() => {
        // Load from local storage
        const storedKey = localStorage.getItem('openrouter_api_key');
        const storedModel = localStorage.getItem('openrouter_model');
        const storedToc = localStorage.getItem('enable_toc');

        if (storedKey) {
            setApiKey(storedKey);
            fetchModels(storedKey);
            // Determine validity based on presence for initial load, 
            // or we could re-validate silently. Let's assume valid if present for now.
            setIsValid(true);
        }

        if (storedModel) {
            setModel(storedModel);
        }

        // Default to true if not set
        if (storedToc !== null) {
            setEnableToc(storedToc === 'true');
        }
    }, []);

    const fetchModels = async (key: string) => {
        setIsLoading(true);
        try {
            const fetchedModels = await OpenRouterService.getFreeModels(key);
            setModels(fetchedModels);

            // If current model is not in list (and we have models), select the first one
            if (fetchedModels.length > 0) {
                setIsValid(true);
                // If no model selected, or selected model not in list (optional check), pick first
                // But we might want to keep the old selection if it's still valid.
                // For now, if no model is set, default to first.
                if (!localStorage.getItem('openrouter_model')) {
                    setModel(fetchedModels[0].id);
                }
            } else {
                // No free models found or error
                // We won't strict fail here, but user might notice empty list
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleValidate = async () => {
        if (!apiKey) return;
        setIsValidating(true);
        setIsValid(null);
        try {
            // We'll use fetchModels as validation too since we need the list anyway
            const fetchedModels = await OpenRouterService.getFreeModels(apiKey);
            if (fetchedModels.length >= 0) {
                // Note: Even if 0 models, the key might be valid but just no free ones? 
                // But usually there's some free ones. 
                // If auth failed, getFreeModels returns empty usually or throws.
                // Let's assume if we get a response it's valid-ish.
                setModels(fetchedModels);
                setIsValid(true);
                if (fetchedModels.length > 0 && !model) {
                    setModel(fetchedModels[0].id);
                }
                toast({
                    title: "API Key Validated",
                    description: `Found ${fetchedModels.length} free models.`,
                });
            } else {
                setIsValid(false);
                toast({
                    title: "Validation Failed",
                    variant: "destructive"
                });
            }
        } catch (e) {
            setIsValid(false);
            toast({
                title: "Validation Failed",
                description: "Could not connect to OpenRouter.",
                variant: "destructive"
            });
        } finally {
            setIsValidating(false);
        }
    };

    const handleSave = () => {
        localStorage.setItem('openrouter_api_key', apiKey);
        localStorage.setItem('openrouter_model', model);
        localStorage.setItem('enable_toc', String(enableToc));

        // Dispatch custom event to notify listeners
        window.dispatchEvent(new Event('settings-changed'));

        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated.",
        });
        onOpenChange?.(false);
    };

    const handleExport = async () => {
        const success = await exportData();
        if (success) {
            toast({
                title: "Export Successful",
                description: "Your backup has been downloaded.",
            });
        } else {
            toast({
                title: "Export Failed",
                description: "Could not create backup.",
                variant: "destructive"
            });
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileToImport(file);
            setShowImportConfirm(true);
        }
    };

    const confirmImport = async () => {
        if (!fileToImport) return;

        try {
            await importData(fileToImport);
            toast({
                title: "Import Successful",
                description: "Your backup has been restored. Reloading...",
            });
            setShowImportConfirm(false);
            setFileToImport(null);

            // Reload page to apply changes
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast({
                title: "Import Failed",
                description: "Could not restore backup. Invalid file format.",
                variant: "destructive"
            });
            setShowImportConfirm(false);
            setFileToImport(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>AI Settings</DialogTitle>
                    <DialogDescription>
                        Configure OpenRouter to enable AI features. We only support free models.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="ai" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="ai">AI Settings</TabsTrigger>
                        <TabsTrigger value="general">General</TabsTrigger>
                    </TabsList>

                    <TabsContent value="ai" className="space-y-4 py-4">
                        {/* API Key Explanation */}
                        <div className="bg-muted/50 rounded-lg border border-border text-sm overflow-hidden transition-all duration-200">
                            <button
                                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                                className="w-full flex items-center justify-between p-4 hover:bg-muted/80 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2 font-semibold text-foreground">
                                    <Info size={16} className="text-primary" />
                                    <span>Why do I need my own API Key?</span>
                                </div>
                                {isInfoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {isInfoExpanded && (
                                <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        Markdown Weaver gives you the power of choice. Using your own OpenRouter key is the smart way to go:
                                    </p>
                                    <ul className="grid gap-2 text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="font-bold text-primary">•</span>
                                            <span><strong>Cost Transparency:</strong> Providing free AI endpoints incurs significant costs. By using your own key, you avoid our service fees and can choose free models directly.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-bold text-primary">•</span>
                                            <span><strong>One Key, Many Models:</strong> A single key unlocks access to Gemini, Claude, GPT, and Llama.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-bold text-primary">•</span>
                                            <span><strong>Free Forever:</strong> You can choose from many highly capable free models.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-bold text-primary">•</span>
                                            <span><strong>Private & Secure:</strong> Your key is encrypted in your browser's local storage. We never see it.</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="apiKey">OpenRouter API Key</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="apiKey"
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => {
                                            setApiKey(e.target.value);
                                            setIsValid(null);
                                        }}
                                        placeholder="sk-or-..."
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleValidate}
                                        disabled={isValidating || !apiKey}
                                        title="Validate Key"
                                    >
                                        {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> :
                                            isValid === true ? <CheckCircle2 className="h-4 w-4 text-green-500" /> :
                                                isValid === false ? <AlertCircle className="h-4 w-4 text-red-500" /> :
                                                    <CheckCircle2 className="h-4 w-4 opacity-50" />
                                        }
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Get a key from <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="underline">openrouter.ai</a>
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="model">Model (Free Only)</Label>
                                <Select value={model} onValueChange={setModel} disabled={models.length === 0}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={isLoading ? "Loading models..." : "Select a model"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {models.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                        {models.length === 0 && !isLoading && (
                                            <SelectItem value="none" disabled>No free models found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="general" className="space-y-4 py-4">
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                            <Label htmlFor="toc-mode" className="flex flex-col space-y-1">
                                <span>Enable Table of Contents</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Show a floating navigation sidebar in Preview mode.
                                </span>
                            </Label>
                            <Switch
                                id="toc-mode"
                                checked={enableToc}
                                onCheckedChange={setEnableToc}
                            />
                        </div>

                        <div className="grid gap-2 border-t pt-4 mt-2">
                            <Label className="mb-2">Data Management</Label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2" onClick={handleExport}>
                                    <Download className="h-4 w-4" />
                                    Export Backup
                                </Button>
                                <Button variant="outline" className="flex-1 gap-2" onClick={handleImportClick}>
                                    <Upload className="h-4 w-4" />
                                    Import Backup
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".json"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Save your workspace to a file or restore from a backup.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Import Confirmation Dialog - Nested or replaced content would be ideal, but let's just use conditional rendering for now or a separate dialog if we could. 
                    Since we are inside a DialogContent, showing another Dialog on top might be tricky with some libraries, but usually fine.
                    However, let's keep it simple and just show an alert or a different view.
                */}

                <Dialog open={showImportConfirm} onOpenChange={setShowImportConfirm}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                                Warning: Overwrite Data
                            </DialogTitle>
                            <DialogDescription>
                                Importing a backup will <strong>permanently delete</strong> all current files and settings.
                                This action cannot be undone. Are you sure you want to proceed?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setShowImportConfirm(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={confirmImport}>Yes, Overwrite & Import</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <DialogFooter className="gap-2 sm:justify-between items-center">
                    <a
                        href="https://openrouter.ai"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:underline transition-colors text-sm font-medium"
                        title="Go to OpenRouter"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M3 12h4l3-6h8" />
                            <path d="M15 3l3 3-3 3" />
                            <path d="M3 12h4l4 6h7" />
                            <path d="M15 21l3-3-3-3" />
                        </svg>
                        OpenRouter
                    </a>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};
