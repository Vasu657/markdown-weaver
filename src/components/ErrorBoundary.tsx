import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Uncaught error in ${this.props.name || 'component'}:`, error, errorInfo);
    }

    private handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-6 text-center space-y-4 bg-muted/10 rounded-lg border border-destructive/20 mt-4">
                    <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                            {this.props.name ? `Error in ${this.props.name}: ` : ''}
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </p>
                    </div>
                    <Button
                        onClick={this.handleReload}
                        variant="outline"
                        className="gap-2"
                    >
                        <RefreshCw size={14} />
                        Reload Application
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
