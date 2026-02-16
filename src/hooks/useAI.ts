
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
        } catch (e) {
            const message = e instanceof Error ? e.message : "Failed to generate.";
            toast({ title: "Error", description: message, variant: "destructive" });
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
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
            toast({ title: "Error", description: message, variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    const generateSlides = async (
        content: string,
        onSuccess: (newContent: string) => void,
        deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
    ) => {
        const creds = getCreds();
        if (!creds) return;

        // Custom prompts based on device
        let promptGuide = '';
        if (deviceType === 'mobile') {
            promptGuide = `
**MOBILE MODE (Low Density)**:
- **Small Screens**: Viewers are on mobile. Keep slides VERY simple.
- **Micro-Slides**: One header + 1 paragraph OR 1 image OR 3-4 bullet points MAX per slide.
- **Split Aggressively**: Break long sections into multiple "Continued" slides.
            `;
        } else if (deviceType === 'tablet') {
            promptGuide = `
**TABLET MODE (Medium Density)**:
- **Balanced**: Viewers have moderate screen space.
- **Content**: Up to 2 paragraphs or 5-6 bullet points per slide.
            `;
        } else {
            promptGuide = `
**DESKTOP/LAPTOP MODE (High Density)**:
- **MANDATORY MERGING**: Sections with < 50 words MUST be merged.
- **NO ORPHANS**: Slides with < 3 lines are FORBIDDEN.
- **FILL THE SPACE**: Viewers have large screens. Pack the slides!
            `;
        }

        try {
            const messages: ChatMessage[] = [
                { role: 'system', content: `You are a **Creative Director & Logic Engine**. Your goal is to transform Markdown into a **World-Class Presentation** for ${deviceType.toUpperCase()}.\n\n### 1. DENSITY RULES (STRICT)\n${promptGuide}\n\n### 2. VISUALIZATION ENGINE (NEW)\n- **AUTO-DIAGRAM**: If you see a process, workflow, or cycle (e.g. "Step 1 -> Step 2"), you MUST convert it into a \`mermaid\` flowchart or sequence diagram on a dedicated slide.\n- **CRITICAL SYNTAX RULE**: You MUST wrap the mermaid code in markdown code blocks like this:\n\`\`\`mermaid\ngraph TD\nA[Start] --> B[End]\n\`\`\`\nIf you do not use the backticks, the diagram will NOT render.\n\n### 3. STYLIST ENGINE (NEW)\n- **EMOJI-FICATION**: Every single slide header MUST start with a relevant emoji (e.g. "# 🚀 Launch Plan").\n- **EMPHASIS**: Auto-bold **key terms** and *critical concepts* in every paragraph.\n\n### 4. ARCHITECT ENGINE (NEW)\n- **AGENDA**: If missing, insert a "📋 Agenda" slide at the start.\n- **SUMMARY**: If missing, insert a "🏆 Key Takeaways" slide at the end.\n\n### 5. UNIVERSAL FORMAT\n- Separator: "---" on a blank line.\n- No conversational filler.` },
                { role: 'user', content: `Transform this content into an advanced slide deck. ACTIVATE ALL ENGINES:\n\n${content}` }
            ];

            // Use a higher context model if possible, or standard free one. 
            // We assume the user's selected model can handle the context window.
            const result = await OpenRouterService.generateCompletion(creds.apiKey, creds.model, messages);

            // Cleanup: Strip wrapping markdown code blocks if present
            let cleanResult = result.trim();
            if (cleanResult.startsWith('```markdown')) {
                cleanResult = cleanResult.replace(/^```markdown\s*/, '').replace(/\s*```$/, '');
            } else if (cleanResult.startsWith('```')) {
                cleanResult = cleanResult.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }

            onSuccess(cleanResult);
            toast({ title: "Slides Generated!", description: `Optimized for ${deviceType}.` });
        } catch (e) {
            const message = e instanceof Error ? e.message : "Failed to generate slides.";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    };

    return {
        isGenerating,
        refactorText,
        autocomplete,
        generateSlides
    };
}
