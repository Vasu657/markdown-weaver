
import { useState } from 'react';
import { OpenRouterService, ChatMessage } from '@/lib/ai-service';
import { useToast } from '@/hooks/use-toast';

export function useAI() {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);

    // Helper to get creds
    const getCreds = () => {
        const apiKey = localStorage.getItem('openrouter_api_key');
        const model = localStorage.getItem('openrouter_model');
        if (!apiKey || !model) {
            toast({
                title: "AI Settings Missing",
                description: "Please configure OpenRouter API Key and Model in settings.",
                variant: "destructive"
            });
            return null;
        }
        return { apiKey, model };
    };

    const refactorText = async (
        text: string,
        instruction: string,
        onSuccess: (newText: string) => void
    ) => {
        const creds = getCreds();
        if (!creds) return;
        if (!text.trim()) {
            toast({ title: "No text selected", description: "Please select text to refactor.", variant: "default" });
            return;
        }

        setIsGenerating(true);
        try {
            const messages: ChatMessage[] = [
                { role: 'system', content: 'You are an expert Markdown editor. Output ONLY the rewritten text in valid Markdown syntax (e.g., **bold**, # headings, [links](url), `code`). Do not add conversational filler or wrap the entire output in a code block unless requested.' },
                { role: 'user', content: `${instruction}:\n\n"${text}"` }
            ];

            const result = await OpenRouterService.generateCompletion(creds.apiKey, creds.model, messages);
            onSuccess(result.trim());
            toast({ title: "Refactored!", description: "Text updated successfully." });
        } catch (e: any) {
            toast({ title: "Error", description: e.message || "Failed to generate.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    const autocomplete = async (
        prefix: string,
        onSuccess: (text: string) => void
    ) => {
        const creds = getCreds();
        if (!creds) return;

        setIsGenerating(true);
        try {
            // For autocomplete, we try to get a continuation.
            const messages: ChatMessage[] = [
                { role: 'system', content: 'You are a Markdown writing assistant. Continue the text naturally using standard Markdown syntax. Output ONLY the continuation.' },
                { role: 'user', content: `Current text:\n${prefix.slice(-2000)}\n\nContinue:` }
            ];

            const result = await OpenRouterService.generateCompletion(creds.apiKey, creds.model, messages);
            onSuccess(result);
        } catch (e: any) {
            toast({ title: "Error", description: e.message, variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        isGenerating,
        refactorText,
        autocomplete
    };
}
