import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

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
    console.error('Unhandled Application Error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A192F',
          color: '#FFFFFF',
          padding: '2rem',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#EF4444'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.75rem' }}>
              सॉवरेन रिकवरी मोड • Application Shield
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Akul Dravin Digital Services has prevented an unhandled exception. The sovereign state is fully preserved.
            </p>

            {this.state.error && (
              <div style={{
                background: '#050D1A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                color: '#F87171',
                textAlign: 'left',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 700
                }}
              >
                <RefreshCw size={16} /> Reload Application
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="btn btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 700
                }}
              >
                <Home size={16} /> Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
