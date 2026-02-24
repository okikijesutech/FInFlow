import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6">
          <Card className="max-w-md border-rose-500/20 bg-rose-500/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10">
                <AlertCircle className="h-6 w-6 text-rose-500" />
              </div>
              <CardTitle className="text-rose-500">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-sm text-muted">
                An unexpected error occurred while rendering this component. Our team has been notified.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="mx-auto gap-2 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Application
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
