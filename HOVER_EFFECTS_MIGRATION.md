# Миграция: Отключение Hover эффектов на мобильных устройствах

## Дата: 5 ноября 2025

## Проблема
Hover эффекты на тачскрин устройствах вызывали проблему "залипания" - после нажатия hover состояние оставалось активным, что ухудшало пользовательский опыт.

## Решение

### 1. JavaScript утилита определения hover
**Файл**: `src/ui/utils/detectHoverCapability.ts`

Создана утилита, которая:
- Определяет, поддерживает ли устройство hover (мышь/тачпад)
- Добавляет классы на `body`: `has-hover` / `no-hover`
- Добавляет классы для типа указателя: `has-fine-pointer` / `has-coarse-pointer`
- Отслеживает изменения (например, при подключении мыши к планшету)

### 2. Интеграция в приложение
**Файл**: `src/ui/main.tsx`

Добавлен вызов `initHoverDetection()` при запуске приложения.

### 3. Глобальные CSS правила
**Файл**: `src/ui/index.css`

Добавлены:
- Медиа-запросы `@media (hover: none)` для отключения hover на тачскрин
- CSS переменная `--hover-enabled` (0/1) для управления hover эффектами
- Документация по использованию

### 4. Документация для разработчиков
**Файл**: `src/ui/styles/responsive.css`

Добавлены комментарии с примерами правильного использования hover стилей.

**Файл**: `docs/HOVER_EFFECTS_GUIDE.md`

Создано полное руководство по работе с hover эффектами в проекте.

### 5. Автоматическая миграция существующих стилей

Создан и выполнен скрипт автоматической миграции:
- Обработано: 125 CSS файлов
- Модифицировано: 50 файлов
- Все существующие `:hover` стили обернуты в `@media (hover: hover)`

## Результаты

✅ **UI компоненты**: 21 файл обновлен  
✅ **UI-Kit компоненты**: 15 файлов обновлено  
✅ **Секции**: 6 файлов обновлено  
✅ **Страницы**: 7 файлов обновлено  
✅ **Auth**: 1 файл обновлен  

## Как это работает

### На устройствах с мышью/тачпадом (desktop, laptop)
```
body.has-hover → hover эффекты активны ✅
@media (hover: hover) → hover стили применяются ✅
```

### На тачскрин устройствах (mobile, tablet)
```
body.no-hover → hover эффекты отключены ❌
@media (hover: hover) → hover стили НЕ применяются ❌
```

## Примеры изменений

### До миграции
```css
.button {
  background-color: blue;
}

.button:hover {
  background-color: darkblue;
}
```

### После миграции
```css
.button {
  background-color: blue;
}

/* Hover effects - only on devices with hover capability */
@media (hover: hover) {
  .button:hover {
    background-color: darkblue;
  }
}
```

## Правила для новых компонентов

При создании новых компонентов **ВСЕГДА** оборачивайте hover стили:

```css
@media (hover: hover) {
  .element:hover {
    /* hover styles here */
  }
}
```

Или используйте класс body:

```css
body.has-hover .element:hover {
  /* hover styles here */
}
```

## Поддержка браузеров

- ✅ Chrome 41+
- ✅ Firefox 64+
- ✅ Safari 9+
- ✅ Edge 12+
- ✅ Все современные мобильные браузеры

## Тестирование

Для тестирования hover эффектов:

1. **Desktop**: Открыть в браузере - hover должен работать
2. **Mobile**: Открыть в DevTools с эмуляцией мобильного устройства - hover НЕ должен работать
3. **Проверка класса**: В консоли `document.body.className` должен показывать `has-hover` или `no-hover`

## Ссылки

- [Руководство по Hover эффектам](docs/HOVER_EFFECTS_GUIDE.md)
- [MDN: @media (hover)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)

## Статус

✅ **ЗАВЕРШЕНО** - Все hover эффекты мигрированы и работают корректно

