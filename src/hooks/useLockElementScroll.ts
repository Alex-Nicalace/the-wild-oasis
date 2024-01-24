import { useEffect } from 'react';

/**
 * Пользовательский хук для блокировки прокрутки указанного элемента.
 *
 * @param {boolean} ignore - Если true, блокировка прокрутки игнорируется
 * @param {string} selector - CSS-селектор элемента, который нужно заблокировать
 * @return {void}
 */
export default function useLockElementScroll(ignore = false, selector: string) {
  const el = document.querySelector(selector);
  useEffect(function () {
    if (ignore) return;
    if (!(el instanceof HTMLElement)) return;
    const existsPaddingRight = parseInt(getComputedStyle(el).paddingRight);
    const widthScroll = el.offsetWidth - el.clientWidth;
    el.style.overflow = 'hidden';
    el.style.paddingRight = `${widthScroll + existsPaddingRight}px`;

    return () => {
      el.style.overflow = '';
      el.style.paddingRight = '';
    };
  });
}
