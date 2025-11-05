# Руководство по Hover эффектам

## Проблема

На мобильных устройствах (тачскрин) hover эффекты не работают корректно:
- При нажатии hover эффект активируется и "залипает"
- Это ухудшает пользовательский опыт
- Hover эффекты предназначены только для устройств с мышью/тачпадом

## Решение

Все hover эффекты в проекте отключены на устройствах без возможности hover (тачскрин устройства).

### Что было реализовано

1. **JavaScript определение устройства** (`src/ui/utils/detectHoverCapability.ts`)
   - Автоматически определяет, поддерживает ли устройство hover
   - Добавляет классы на `body`:
     - `has-hover` - устройство с мышью/тачпадом
     - `no-hover` - тачскрин устройство
     - `has-fine-pointer` - точный указатель (мышь)
     - `has-coarse-pointer` - неточный указатель (палец)

2. **Глобальные CSS правила** (`src/ui/index.css`)
   - Медиа-запросы `@media (hover: hover)` для отключения hover на тачскрин
   - CSS переменные для управления hover эффектами

3. **Обновленные компоненты**
   - Все существующие hover стили обернуты в `@media (hover: hover)`
   - Это значит hover работает ТОЛЬКО на устройствах с hover capability

## Как писать hover эффекты правильно

### ✅ Правильно

Всегда оборачивайте hover стили в медиа-запрос:

```css
/* Базовые стили */
.button {
  background-color: blue;
  transition: background-color 0.2s ease;
}

/* Hover стили - только для устройств с hover */
@media (hover: hover) {
  .button:hover {
    background-color: darkblue;
  }
}
```

### ❌ Неправильно

Не пишите hover стили напрямую:

```css
/* Плохо - будет работать и на тачскрин устройствах */
.button:hover {
  background-color: darkblue;
}
```

## Альтернативный подход

Можно также использовать класс на body:

```css
/* Hover стили - используя класс body */
body.has-hover .button:hover {
  background-color: darkblue;
}
```

Этот подход полезен, если вам нужна поддержка старых браузеров, которые не поддерживают `@media (hover: hover)`.

## Active состояния

`:active` состояния работают на всех устройствах и НЕ требуют оборачивания:

```css
/* Правильно - active работает на всех устройствах */
.button:active {
  transform: translateY(1px);
}
```

## Проверка hover capability в JavaScript

Если вам нужно проверить hover capability в JavaScript:

```typescript
import { detectHoverCapability } from '@/utils/detectHoverCapability';

// Проверка через CSS медиа-запрос
const hasHover = window.matchMedia('(hover: hover)').matches;

// Проверка через класс на body
const hasHoverClass = document.body.classList.contains('has-hover');

if (hasHover) {
  // Логика для устройств с hover
} else {
  // Логика для тачскрин устройств
}
```

## Статистика миграции

- **Обработано файлов**: 125 CSS файлов
- **Модифицировано файлов**: 50 файлов
- **Обработано компонентов**: 
  - UI компоненты: 42 файла (21 модифицировано)
  - UI-Kit компоненты: 62 файла (15 модифицировано)
  - Секции: 13 файлов (6 модифицировано)
  - Страницы: 7 файлов (7 модифицировано)
  - Auth: 1 файл (1 модифицирован)

## Поддержка браузеров

Медиа-запрос `@media (hover: hover)` поддерживается в:
- ✅ Chrome 41+
- ✅ Firefox 64+
- ✅ Safari 9+
- ✅ Edge 12+
- ✅ iOS Safari 9+
- ✅ Chrome Android 41+

Fallback через JavaScript гарантирует работу даже в старых браузерах.

## Дополнительные материалы

- [MDN: @media (hover)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [MDN: pointer media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- [CSS Tricks: Interaction Media Features](https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/)

