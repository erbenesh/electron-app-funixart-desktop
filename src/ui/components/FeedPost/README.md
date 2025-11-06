# FeedPost Component

Универсальный компонент для отображения поста из ленты новостей.

## Использование

```tsx
import { FeedPost } from '#/components/FeedPost/FeedPost';

<FeedPost
  post={post}
  token={userToken}
  userAvatar={userAvatar}
  onVote={() => refetchPosts()}
  onImageClick={(url, allImages, clickedIndex) => {
    // Открыть lightbox
  }}
  onCommentClick={() => {
    // Раскрыть/скрыть комментарии
  }}
/>
```

## Props

### `post` (required)
Тип: `Article`

Объект поста с полями:
- `id` - ID поста
- `channel` - информация о канале
- `payload.blocks` - массив блоков контента (header, paragraph, quote, media)
- `comment_count` - количество комментариев
- `repost_count` - количество репостов
- `vote_count` - количество голосов
- `vote` - голос текущего пользователя (0 - нет, 1 - минус, 2 - плюс)
- `last_update_date` - дата последнего обновления

### `token` (optional)
Тип: `string`

Токен авторизации пользователя для голосования и комментирования.

### `userAvatar` (optional)
Тип: `string`

URL аватара пользователя для отображения в поле ввода комментария.

### `onVote` (optional)
Тип: `() => void`

Callback, вызываемый после успешного голосования. Используется для обновления данных.

### `onImageClick` (optional)
Тип: `(url: string, allImages: string[], clickedIndex: number) => void`

Callback при клике на изображение. Параметры:
- `url` - URL кликнутого изображения
- `allImages` - массив всех URL изображений в блоке
- `clickedIndex` - индекс кликнутого изображения

### `onCommentClick` (optional)
Тип: `() => void`

Callback при клике на кнопку комментариев.

## Возможности

- ✅ Отображение различных типов блоков (header, paragraph, quote, media)
- ✅ Система голосования (upvote/downvote)
- ✅ Счетчики комментариев и репостов
- ✅ Переход на страницу канала
- ✅ Переход на страницу поста (кнопка "Показать ещё")
- ✅ Ввод комментария
- ✅ Поддержка изображений с различными макетами (1-6+ изображений)
- ✅ Адаптивный дизайн (desktop/mobile)

## Типы блоков контента

### Header
Крупный заголовок (h2) с повышенным font-weight.

### Paragraph
Обычный текст без дополнительного оформления.

### Quote
Текст с вертикальной линией слева (блок цитаты).

### Media
Сетка изображений с адаптивным макетом в зависимости от количества.

## Стили

Компонент использует собственные стили из `FeedPost.module.css`:
- Темная тема по умолчанию
- Анимация появления
- Hover-эффекты (только на desktop)
- Адаптивность под мобильные устройства

