import { useEffect } from 'react';

/**
 * Пользовательский хук для блокировки прокрутки документа при вызове.
 *
 * @return {void} Нет возвращаемого значения
 */
export default function useLockDocumentScroll() {
  useEffect(function () {
    const widthScroll =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${widthScroll}px`;

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  });
}
