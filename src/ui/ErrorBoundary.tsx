import React, { Component, ErrorInfo } from 'react';

type ErrorBoundarySharedProps = {
  children: React.ReactNode;
  onReset?: (error?: Error) => void;
  onError?: (error?: Error, errorInfo?: ErrorInfo) => void;
};

export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent?: never;
  fallbackRender: (
    error: Error,
    resetErrorBoundary: () => void
  ) => React.ReactNode;
};

export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  fallback: JSX.Element;
  FallbackComponent?: never;
  fallbackRender?: never;
};

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
};

export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent: React.ComponentType<ErrorFallbackProps>;
  fallbackRender?: never;
};

type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithRender
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent;

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  /**
   * Метод для сброса ошибки.
   * @returns void
   */
  resetErrorBoundary() {
    if (!this.state.error) return;

    this.setState({ error: null });
    // Вызываем пропс onReset, если он был передан
    this.props.onReset?.(this.state.error);
  }

  /**
   * Метод жизненного цикла, используется для обновления состояния в ответ на ошибку.
   * Выполняется перед componentDidCatch.
   */
  static getDerivedStateFromError(err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    // Обновляем состояние, чтобы при следующем рендеринге был показан резервный пользовательский интерфейс.
    return { error };
  }

  /**
   * Метод жизненного цикла, используется для обработки ошибок.
   * Выполняется после getDerivedStateFromError.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Вызываем пропс onError, если он был передан
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.error)
      return (
        <>
          {/* в случае когда задействован пропс fallbackRender*/}
          {this.props.fallbackRender &&
            this.props.fallbackRender(
              this.state.error,
              this.resetErrorBoundary
            )}
          {/* в случае когда задействован пропс  FallbackComponent*/}
          {this.props.FallbackComponent && (
            <this.props.FallbackComponent
              error={this.state.error}
              resetErrorBoundary={this.resetErrorBoundary}
            />
          )}
          {/* в случае когда задан пропс fallback*/}
          {this.props.fallback && this.props.fallback}
        </>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
