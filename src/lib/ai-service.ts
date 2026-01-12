
export interface OpenRouterModel {
    id: string;
    name: string;
    description?: string;
    pricing?: {
        prompt: string;
        completion: string;
    };
    context_length?: number;
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

export class OpenRouterService {
    private static getHeaders(apiKey: string) {
        return {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Markdown Weaver',
            'Content-Type': 'application/json',
        };
    }

    static async validateApiKey(apiKey: string): Promise<boolean> {
        try {
            const response = await fetch(`${OPENROUTER_API_URL}/auth/key`, {
                headers: this.getHeaders(apiKey),
            });
            return response.status === 200;
            // Note: OpenRouter's /auth/key endpoint might behave differently, 
            // often a simple models call is used to validate.
            // Let's fallback to models call if this specific endpoint isn't standard in their doc immediately.
            // Actually standardizing on fetching models as validation is safer.
        } catch (e) {
            return false;
        }
    }

    static async getFreeModels(apiKey: string): Promise<OpenRouterModel[]> {
        try {
            const response = await fetch(`${OPENROUTER_API_URL}/models`, {
                headers: this.getHeaders(apiKey),
            });

            if (!response.ok) throw new Error('Failed to fetch models');

            const data = await response.json();

            // Filter for free models. 
            // OpenRouter models usually have a pricing field. 
            // We look for '0' or '0.0' or specific free IDs.
            // Also some models have 'free' in their id or pricing.

            const models: OpenRouterModel[] = (data.data || []).map((m: any) => ({
                id: m.id,
                name: m.name,
                description: m.description,
                pricing: m.pricing,
                context_length: m.context_length
            }));

            // Naive filter for "free" models based on pricing being 0
            // or explicitly known free model IDs if pricing isn't clear content.
            // Ideally we check `pricing.prompt === '0'` and `pricing.completion === '0'`
            return models.filter(m => {
                const p = m.pricing;
                if (!p) return false;
                return (p.prompt === '0' || p.prompt === '0.0' || parseFloat(p.prompt) === 0) &&
                    (p.completion === '0' || p.completion === '0.0' || parseFloat(p.completion) === 0);
            });

        } catch (error) {
            console.error('Error fetching models:', error);
            return [];
        }
    }

    static async generateCompletion(
        apiKey: string,
        model: string,
        messages: ChatMessage[],
        onUpdate?: (chunk: string) => void
    ): Promise<string> {
        try {
            const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
                method: 'POST',
                headers: this.getHeaders(apiKey),
                body: JSON.stringify({
                    model,
                    messages,
                    stream: !!onUpdate, // Enable streaming if callback provided
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Failed to generate completion');
            }

            if (onUpdate && response.body) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullContent = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6);
                            if (dataStr.trim() === '[DONE]') continue;

                            try {
                                const data = JSON.parse(dataStr);
                                const content = data.choices[0]?.delta?.content || '';
                                if (content) {
                                    fullContent += content;
                                    onUpdate(fullContent);
                                }
                            } catch (parseError) {
                                // ignore json parse errors for partial chunks
                            }
                        }
                    }
                }
                return fullContent;
            } else {
                const data = await response.json();
                return data.choices[0]?.message?.content || '';
            }

        } catch (error) {
            console.error('Error generating completion:', error);
            throw error;
        }
    }
}
