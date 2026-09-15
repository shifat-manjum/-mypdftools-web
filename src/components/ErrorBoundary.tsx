import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
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
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-[800px] mx-auto my-12 p-8 bg-white border border-red-200 rounded-3xl shadow-sm text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {this.props.fallbackTitle || 'Qualcosa è andato storto / Ein Fehler ist aufgetreten'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            {this.state.error?.message || 'Si è verificato un errore imprevisto durante il rendering.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Ricarica la pagina / Seite neu laden</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
