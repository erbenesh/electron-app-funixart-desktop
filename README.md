# Anixart Desktop — Electron + React (Vite)

Проект настольного приложения на Electron с фронтендом на React + TypeScript (Vite). Сборка фронтенда складывается в `dist-react`, а Electron подхватывает `index.html` из этой папки.

## Требования

- Node.js 18+ (рекомендуется LTS)
- npm 9+
- Windows/macOS/Linux

## Установка

```bash
npm install
```

## Скрипты

- `npm run dev:react` — запуск Vite дев-сервера (фронтенд) на http://localhost:5173
- `npm run dev:electron` — запуск Electron (читает собранный `dist-react`)
- `npm run electron:dev` — быстрый старт: поднимает Vite и открывает Electron
- `npm run build` — типизация + прод-сборка фронтенда в `dist-react`
- `npm run transpile:electron` — транспиляция кода `src/electron` (если используется TS-конфиг)
- `npm run electron:build` — прод-сборка фронта и упаковка приложения через electron-builder (артефакты в `out/`)
- `npm run lint` — запуск ESLint
- `npm run preview` — локальный предпросмотр собранного фронтенда

## Как запустить в разработке

Вариант 1 (рекомендован): два терминала

1. Терминал A — фронтенд:
   ```bash
   npm run dev:react
   ```
2. Терминал B — Electron (после первого успешного старта Vite):
   ```bash
   npm run dev:electron
   ```

Вариант 2 (одной командой):

```bash
npm run electron:dev
```

Примечание: команда запускает Vite и затем Electron. Если окно Electron открылось без стилей/контента, дождитесь готовности Vite или перезапустите Electron-окно.

## Продакшн-сборка

1. Собрать фронтенд:
   ```bash
   npm run build
   ```
2. Упаковать приложение:
   ```bash
   npm run electron:build
   ```
   Готовые установщики и билды появятся в папке `out/`.

## Стек и структура

- React 18, TypeScript, Vite
- Electron 33, electron-builder
- React Router, Zustand, @tanstack/react-query
- ESLint (flat config)

Ключевые директории:

- `src/ui` — основной UI-код (страницы, компоненты, хуки)
- `src/ui-kit` — дизайн-система (UI-компоненты)
- `src/ui/api` — сервисы и хуки для API
- `src/electron` — основная точка входа Electron (`main.js`)
- `dist-react` — результат сборки фронтенда
- `out` — артефакты сборки electron-builder

## Конфигурация

Vite:

```ts
// vite.config.ts
build: {
  outDir: 'dist-react'
}
```

Electron загружает фронтенд из `dist-react/index.html`:

```js
// src/electron/main.js
mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
```

## Качество кода

- Линтинг:
  ```bash
  npm run lint
  ```
- Типизация (в составе build):
  ```bash
  npm run build
  ```

## Трюки и советы

- Если Electron открывается с пустым экраном в дев-режиме, убедитесь, что Vite поднялся и отдал `index.html`. Перезапуск Electron после старта Vite обычно помогает.
- При изменении конфигурации ESLint (flat config) используйте массив конфигов и точечные `files`/`rules` для переопределений.

## Лицензия

MIT (если не указано иное).
