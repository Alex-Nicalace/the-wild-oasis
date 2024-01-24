import { useEffect, useRef } from 'react';

/**
 * Функция, обрабатывающая клик за пределами указанного элемента.
 *
 * @param {(e: MouseEvent) => void} handler - колбэк функция, которая будет выполнена при клике за пределами элемента
 * @param {boolean} [capture=true] - флаг для указания использования фазы захвата
 * @param {boolean} [ignore=false] - флаг для указания игнорирования клика за пределами элемента
 * @return {React.MutableRefObject<T>} ссылка на элемент
 */
export function useOutsideClick<T extends HTMLElement>(
  handler: (e: MouseEvent) => void,
  ignore = false,
  capture = true
) {
  const elenemtRef = useRef<T>(null);

  useEffect(() => {
    if (ignore) return;
    function handleClick(e: MouseEvent) {
      if (!elenemtRef.current?.contains(e.target as Node)) {
        handler(e);
      }
    }

    document.addEventListener('click', handleClick, capture);

    return () => document.removeEventListener('click', handleClick, capture);
  }, [handler, capture, ignore]);

  return elenemtRef;
}
