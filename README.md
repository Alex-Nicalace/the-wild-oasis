# Примечания о проекте

## pattern Compound component pattern & Render props pattern

Модальное окно с 20-мя патернами проектирования:

[ModalDialog.tsx](./src/ui/ModalDialog.tsx)

## react-hot-toast

`react-hot-toast` - это библиотека для обработки уведомлений (тоастов) в React-приложениях.

## React Query

### Components

`QueryClient`, `QueryClientProvider`, `ReactQueryDevtools`

### Hooks

- `useQueryClient`,
- `useQuery`, по умолчанию неудачные запросы повторяются 3 раза, влияет на это поведение параметр `retry`
- `useMutation` - в параметр `mutationFn` можно предавать колбэк только с одним аргументом

## компонент _Menu.tsx_

[Menus.tsx](./src/ui/Menus.tsx)

Компонент выпадающего меню.

В момент видимости меню при скроле возникает артефакт.
Варианты решения:

1. запретить скрол во время активности меню. [useLockElementScroll](./src/hooks/useLockElementScroll.ts), [useLockDocumentScroll](./src/hooks/useLockDocumentScroll.ts)
2. позиционировать `absolute`

Сделал пропс `isLockScroll` с помощью него можно регулировать характер появления меню. Позиционирование будет либо относительно окна, тогда будет блокироваться скрол, либо тносительно контейнера компонента, тогда будет возможность скролить.

## Кастомные хуки

- [useLockElementScroll](./src/hooks/useLockElementScroll.ts) - блокирует скрол у указанного по селеутору элемента
- [useLockDocumentScroll](./src/hooks/useLockDocumentScroll.ts) - блокирует скрол у документа
- [useOutsideClick](./src/hooks/useOutsideClick.ts) - запускает колбэк при клике вне компонента в котором был объявлен
- `useMoveBack` - возвращает колбэк, который можно использовать для возврата на один шаг назад в истории браузера

## React Router Dom

### Hooks

`useSearchParams` - используется для чтения и изменения строки запроса в _URL_-адресе текущего местоположения.

`useNavigate` - программное изменение строки запроса

`useParams` - значения динамических параметров Роута

## Использование rest параметра в компоненте

- [Select.tsx](./src/ui/Select.tsx) - блокирует скрол у указанного по селеутору элемента

## Выподающее меню для выбора сортировки

- [SortBy.tsx](./src/ui/SortBy.tsx)

сортировка по полю с неизвестным типом. Желание было не указыавать поля строковые и числовые, а чтобы динамически определять тип поля и применить соответствующий аогоритм сортировки

[CabinTable.tsx](./src/features/cabins/CabinTable.tsx)

## Сортировка и фильтрация на стороне сервера, динамическое создание запроса

[useBookings.tsx](./src/features/bookings/BookingTableOperations.tsx)

[apiBookings.tsx](./src/services/apiBookings.ts)

## Pagination

Пример переиспользуемого компонента пагинации

пагинация на стороне сервера

### Предварительная загрузка следующей/предыдущей страницы

[useBookings.ts](./src/features/bookings/useBookings.ts)

[Pagination.tsx](./src/ui/Pagination.tsx)

## Фильтрация запроса с подчетом количества строк не учитывая фильтра

[getBookings](./src/services/apiBookings.ts)
