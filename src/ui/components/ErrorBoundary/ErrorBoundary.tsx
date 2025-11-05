import { Component, type ReactNode } from 'react';
import { Button } from 'ui-kit';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    
    // Send to error tracking service if available
    if (typeof window !== 'undefined' && (window as any).errorTracker) {
      (window as any).errorTracker.captureException(error, { errorInfo });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
            Что-то пошло не так
          </h2>
          <p style={{ 
            marginBottom: '1.5rem', 
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
          }}>
            {process.env.NODE_ENV === 'development' 
              ? this.state.error?.message 
              : 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте перезагрузить страницу.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={this.handleReset}>
              Попробовать снова
            </Button>
            <Button onClick={() => window.location.reload()} variant="ghost">
              Перезагрузить страницу
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginTop: '2rem', 
              maxWidth: '800px',
              textAlign: 'left',
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                Stack trace
              </summary>
              <pre style={{
                padding: '1rem',
                background: 'var(--color-bg-elevated)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.875rem',
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

