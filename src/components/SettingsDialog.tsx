
import React, { useState, useEffect } from 'react';
import { Settings, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
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
import { OpenRouterService, OpenRouterModel } from '@/lib/ai-service';
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();

    useEffect(() => {
        // Load from local storage
        const storedKey = localStorage.getItem('openrouter_api_key');
        const storedModel = localStorage.getItem('openrouter_model');

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
        toast({
            title: "Settings Saved",
            description: "Your AI preferences have been updated.",
        });
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>AI Settings</DialogTitle>
                    <DialogDescription>
                        Configure OpenRouter to enable AI features. We only support free models.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
