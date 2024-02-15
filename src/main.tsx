import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import ErrorBoundary from './ui/ErrorBoundary.tsx';
import ErrorFallback from './ui/ErrorFallback.tsx';

// Устанавливаем русскую локаль как глобальную при работе с датой
setDefaultOptions({ locale: ru });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      // fallback={<div>Что-то пошло не так</div>}
      // fallbackRender={(error, resetErrorBoundary) => (
      //   <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      // )}
      FallbackComponent={ErrorFallback}
      onError={(error) => console.error(error)}
      onReset={() => (window.location.href = '/')}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
