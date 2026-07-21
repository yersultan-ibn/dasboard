# Dashboard Builder

Конструктор дашборда на данных [SpaceX API](https://github.com/r-spacex/SpaceX-API):
пользователь собирает собственную панель из виджетов (таблица, статистика,
график, карточка запуска), меняет их порядок перетаскиванием (drag & drop), а
конфигурация сохраняется в `localStorage` и восстанавливается после перезагрузки.

Приложение построено на **Next.js 14 App Router**, **React Query**, **Zustand**,
**SCSS Modules** и организовано по **Feature-Sliced Design**. Поддерживаются
светлая/тёмная темы и два окружения (development / production).

## Содержание

- [Технологии](#технологии)
- [Инструкции по запуску](#инструкции-по-запуску)
- [Описание архитектуры](#описание-архитектуры)
- [Структура FSD](#структура-fsd)
- [Выбранные решения](#выбранные-решения)
- [Окружения](#окружения)
- [Качество кода](#качество-кода)
- [Деплой](#деплой-на-vercel-два-окружения)
- [Компромиссы и что можно улучшить](#компромиссы-и-что-можно-улучшить)

## Технологии

| Область              | Инструмент                                         |
| -------------------- | -------------------------------------------------- |
| Язык                 | TypeScript (`strict: true`)                        |
| Фреймворк            | Next.js 14 (App Router, RSC, SSR-префетч)          |
| UI                   | React 18, SCSS Modules, токен-система (light/dark) |
| Серверное состояние  | `@tanstack/react-query` v5                         |
| Клиентское состояние | Zustand + `persist`                                |
| Drag & Drop          | `@dnd-kit/core` + `@dnd-kit/sortable`              |
| Графики              | Recharts                                           |
| Архитектура          | Feature-Sliced Design                              |
| Качество кода        | ESLint, Prettier, Husky + lint-staged              |

## Инструкции по запуску

Требуется Node.js 18+ и Yarn.

```bash
yarn install
yarn dev          # http://localhost:3000 (окружение development)
```

Прочие команды:

```bash
yarn build        # production-сборка
yarn start        # запуск собранной сборки
yarn lint         # ESLint
yarn typecheck    # tsc --noEmit
yarn format       # Prettier --write .
```

Переменные окружения (все публичные, без секретов) — см.
[.env.example](.env.example); значения по окружениям —
[.env.development](.env.development) и [.env.production](.env.production).

## Описание архитектуры

Проект организован по **Feature-Sliced Design**. Слои идут сверху вниз, и
**импортировать можно только «вниз»** по этому списку — это главное правило,
которое держит зависимости однонаправленными и предсказуемыми:

```
app        →  композиция страницы, провайдеры, layout, глобальные стили, реестр виджетов
widgets    →  самостоятельные UI-блоки (виджеты-плитки, канвас, библиотека)
features   →  пользовательские действия (add / remove / reorder / refresh)
entities   →  доменные сущности (launch — сервер; dashboard — конфиг; widget — каталог)
shared     →  инфраструктура без бизнес-логики (ui-kit, api, config, lib)
```

Каждый слайс имеет публичный API (`index.ts`) — снаружи импортируется только он,
без «глубоких» путей вида `.../ui/...`. Это фиксирует контракт слайса и не даёт
случайно завязаться на его внутренности.

Ключевой принцип разделения ответственности — **серверное и клиентское состояние
не смешиваются**:

- **React Query** хранит только данные SpaceX (кэш, ключи, статусы загрузки).
- **Zustand** хранит только пользовательскую конфигурацию дашборда (какие
  виджеты и в каком порядке). Данные API в стор не попадают.

## Структура FSD

```text
src/
  app/
    layout.tsx                 # html, инициализация темы (anti-FOUC), провайдеры, header, banner
    page.tsx                   # SSR-префетч + HydrationBoundary + hero
    providers.tsx              # QueryClientProvider
    globals.scss               # токены light/dark + reset
    ui/
      app-header.tsx           # брендинг + «Обновить» + переключатель темы
      environment-banner.tsx   # индикатор окружения (dev)
      dashboard-view.tsx       # реестр виджетов (IoC) + раскладка
  entities/
    launch/                    # SpaceX: типы, query-keys, query-опции, хуки, селекторы
    dashboard/                 # store конфигурации дашборда (Zustand + persist)
    widget/                    # каталог видов виджетов (метаданные, иконки)
  features/
    add-widget/                # кнопка «Добавить»
    remove-widget/             # кнопка удаления
    reorder-widgets/           # SortableWidget + DragHandle (через React context)
    refresh-data/              # кнопка «Обновить» (invalidateQueries)
  shared/
    api/                       # http-клиент (ApiError), query-client
    config/                    # типизированный env
    lib/                       # format, logger, cn
    ui/                        # Card, Button, Icon, Skeleton, StatusBadge, QueryBoundary, ThemeToggle
  widgets/
    dashboard-canvas/          # сетка + DnD + WidgetFrame
    widget-library/            # список доступных виджетов
    launch-stats/ launch-chart/ launches-table/ news-card/   # виджеты-плитки (только контент)
```

## Выбранные решения

**1. Конфигурация дашборда — это `entity`, а не `feature`.**
Действия `add-widget`, `remove-widget`, `reorder-widgets` меняют одно и то же
состояние. Если бы store жил в отдельной feature, остальные features
импортировали бы его — а это запрещённый импорт «внутри одного слоя». Поэтому
store вынесен в `entities/dashboard`, и features зависят от него **вниз** по
слоям. Побочный плюс — состояние остаётся минимальным (только список виджетов и
порядок).

**2. Реестр виджетов — инверсия управления на слое `app`.**
Канвасу нужно отрисовать плитку по её типу, но `widgets/dashboard-canvas` не
имеет права импортировать соседние виджеты (снова импорт внутри слоя). Реестр
`type → компонент` живёт в `app/ui/dashboard-view.tsx` (единственный слой,
которому можно зависеть от всех виджетов) и передаётся в канвас пропом
`renderWidgetContent`. Канвас остаётся чистой раскладкой с DnD.

**3. Drag-handle через context, без протечки dnd-kit в виджеты.**
`reorder-widgets` публикует привязки dnd-kit через React context, а сам «грип»
(`DragHandle`) рендерится в шапке карточки на слое `widgets` — так виджеты не
касаются dnd-kit напрямую.

**4. SSR только там, где он осмыслен.**
В `app/page.tsx` данные SpaceX префетчатся на сервере и отдаются в клиент через
`HydrationBoundary` — первый рендер уже гидратирован, без «мигания» загрузки.
Расстановка виджетов живёт в `localStorage`, поэтому на сервере рисуется
скелетон, а реальная раскладка появляется после гидратации стора (это исключает
hydration mismatch).

**5. React Query — один источник ключей и опций.**
Query keys ([query-keys.ts](src/entities/launch/api/query-keys.ts)) и фабрики
`queryOptions` ([queries.ts](src/entities/launch/api/queries.ts)) переиспользуются
сервером (префетч), клиентом (хуки) и инвалидацией. Кэш: `staleTime` 5 мин,
`gcTime` 15 мин, `retry: 1`. Состояния loading / error / empty инкапсулированы в
один компонент [QueryBoundary](src/shared/ui/query-boundary.tsx). Инвалидация —
кнопка «Обновить» вызывает `invalidateQueries` по корневым ключам
([refresh-button.tsx](src/features/refresh-data/ui/refresh-button.tsx)); мутаций
серверных данных нет (SpaceX API только на чтение), поэтому инвалидация оформлена
как ручное обновление.

**6. Темизация без вспышки.**
Одна токен-система в [globals.scss](src/app/globals.scss): светлая тема в `:root`,
тёмная — в `[data-theme="dark"]` и через `prefers-color-scheme` (переключатель
всегда перевешивает системную тему). Выбор сохраняется в `localStorage` и
применяется инлайн-скриптом до первой отрисовки.

## Окружения

Окружение определяется переменной `NEXT_PUBLIC_APP_ENV` (а не `NODE_ENV`, который
на хостинге всегда `production`). Окружения различаются не только названием:

| Параметр                     | development     | production      |
| ---------------------------- | --------------- | --------------- |
| `NEXT_PUBLIC_APP_ENV`        | `development`   | `production`    |
| Баннер окружения             | показан         | скрыт           |
| Feature flag «новости»       | включён         | выключен        |
| Логирование запросов/ответов | подробное       | только ошибки   |
| `NEXT_PUBLIC_API_BASE_URL`   | конфигурируемый | конфигурируемый |

## Качество кода

- **ESLint** ([.eslintrc.json](.eslintrc.json)) — `next/core-web-vitals` +
  `prettier` + правило порядка/группировки импортов (`import/order`).
- **Prettier** ([.prettierrc.json](.prettierrc.json)) — единый стиль
  форматирования.
- **Husky + lint-staged** — pre-commit хук ([.husky/pre-commit](.husky/pre-commit))
  прогоняет `eslint --fix` и `prettier` по застейдженным файлам, чтобы в
  репозиторий не попадал невалидный/неотформатированный код.

## Деплой на Vercel (два окружения)

Нужны две отдельные ссылки, поэтому создаём **два проекта Vercel из одного
репозитория** — у каждого свои стабильные URL и переменные окружения.

Текущие окружения:

- **Production:** https://dashboard-prod-chi.vercel.app/
- **Development:** https://dasboard-dev.vercel.app/

Git workflow для деплоя:

- **Production** проект в Vercel привязан к ветке `main`
- **Development** проект в Vercel привязан к ветке `dev`

1. Запушить репозиторий на GitHub.
2. **Production:** Vercel → _Add New Project_ → импортировать репозиторий.
   Framework определится как Next.js, пакетный менеджер — yarn. Переменные:
   ```
   NEXT_PUBLIC_APP_ENV=production
   NEXT_PUBLIC_API_BASE_URL=https://api.spacexdata.com/v4
   NEXT_PUBLIC_ENV_BANNER=
   NEXT_PUBLIC_FEATURE_NEWS_WIDGET=false
   ```
3. **Development:** _Add New Project_ ещё раз, тот же репозиторий (имя вида
   `dashboard-builder-dev`), те же переменные, но:
   ```
   NEXT_PUBLIC_APP_ENV=development
   NEXT_PUBLIC_ENV_BANNER=DEVELOPMENT
   NEXT_PUBLIC_FEATURE_NEWS_WIDGET=true
   ```

Получаем две независимые ссылки с разным поведением. (GitHub Pages не подходит —
это статический хостинг без поддержки SSR.)

## Компромиссы и что можно улучшить

- **Тесты.** Автоматических тестов нет, чтобы не раздувать объём задания. Логика
  вынесена в чистые селекторы (`entities/*/lib`), которые легко покрыть
  unit-тестами; DnD и persist — кандидаты на e2e.
- **Раскладка.** Сейчас адаптивная сетка колонок; при наличии времени — размеры
  плиток, resize и layout-пресеты.
- **API endpoint.** Одинаков для обоих окружений (у SpaceX один публичный API),
  но полностью управляется через `NEXT_PUBLIC_API_BASE_URL` — сюда подключается
  разный бэкенд при необходимости.
- **Инвалидация.** Оформлена как ручное обновление, т.к. мутаций нет; при
  появлении write-эндпоинтов та же схема ключей даёт точечную инвалидацию после
  мутаций.
- **Реестр виджетов.** Можно расширить метаданными (размер по умолчанию,
  разрешённые позиции) для более гибкой конфигурации.

## Примечание об AI

README и часть шаблонного кода подготовлены с помощью AI-инструмента и приведены
в соответствие с актуальной реализацией проекта.
