import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';

// Устанавливаем русскую локаль как глобальную при работе с датой
setDefaultOptions({ locale: ru });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
