## компонент _Menu.tsx_

Компонент выпадающего меню.

В момент видимости меню при скроле возникает артефакт.
Варианты решения:

1. запретить скрол во время активности меню. [useLockElementScroll](./src/hooks/useLockElementScroll.ts), [useLockDocumentScroll](./src/hooks/useLockDocumentScroll.ts)
2. позиционировать `absolute`

Сделал пропс `isLockScroll` с помощью него можно регулировать характер появления меню. Позиционирование будет либо относительно окна, тогда будет блокироваться скрол, либо тносительно контейнера компонента, тогда будет возможность скролить.

## Кастомные хуки

- [useLockElementScroll](./src/hooks/useLockElementScroll.ts) - блокирует скрол у указанного по селеутору элемента
- [useLockDocumentScroll](./src/hooks/useLockDocumentScroll.ts) - блокирует скрл у документа
- [useOutsideClick](./src/hooks/useOutsideClick.ts) - запускает колбэк при клике вне компонента в котором был объявлен

## React Router Dom

### Hooks

`useSearchParams` - используется для чтения и изменения строки запроса в _URL_-адресе текущего местоположения.
