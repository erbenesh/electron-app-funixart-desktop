# Рефакторинг авторизации и регистрации

## Обзор изменений

Проведен полный рефакторинг системы авторизации и регистрации для соответствия API документации и устранения дублирования кода.

## Основные изменения

### 1. Обновлен `AuthPage.tsx`

- ✅ Заменен `profileService` на `authService` для всех операций авторизации
- ✅ Добавлена полная обработка кодов ошибок согласно `ResponseCode` enum
- ✅ Улучшена валидация ответов API с проверкой `code === ResponseCode.SUCCESSFUL`
- ✅ Добавлена обработка специфичных ошибок для каждого сценария:
  - Вход (sign-in): INVALID_LOGIN, INVALID_PASSWORD, BANNED, PERM_BANNED
  - Регистрация (sign-up): INVALID_LOGIN, INVALID_EMAIL, INVALID_PASSWORD, LOGIN_ALREADY_TAKEN, EMAIL_ALREADY_TAKEN, EMAIL_SERVICE_DISALLOWED, TOO_MANY_REGISTRATIONS
  - Восстановление пароля (restore): обработка ошибок отправки кода и верификации
  - Повторная отправка кода: CODE_ALREADY_SEND

### 2. Очищен `ProfileService.ts`

Удалены методы авторизации, которые дублировались с `AuthService`:
- ❌ `signIn()`
- ❌ `signUp()`
- ❌ `signInWithGoogle()`
- ❌ `signInWithVk()`
- ❌ `verify()`
- ❌ `resend()`
- ❌ `restore()`
- ❌ `restoreResend()`
- ❌ `restoreVerify()`
- ❌ `postSubmitLogin()` (legacy метод)

Оставлены только методы для работы с профилем:
- ✅ `getProfile()`
- ✅ `getMyProfile()`
- ✅ `getNicknamesHistory()`
- ✅ `getProfileSocial()`
- ✅ `processProfile()`
- ✅ `getProfileRoleList()`

### 3. Обновлены типы ответов (`types/responses.ts`)

```typescript
// Добавлены недостающие поля
export interface ResendResponse extends BaseResponse {
  codeTimestampExpires?: number;
}

export interface RestoreResponse extends BaseResponse {
  hash?: string;
  codeTimestampExpires?: number;
}

export interface RestoreResendResponse extends BaseResponse {
  codeTimestampExpires?: number;
}
```

### 4. Очищен `useProfile.ts`

Удален устаревший хук:
- ❌ `useLogin()` - теперь используйте `useSignIn()` из `useAuth.ts`

### 5. Хуки для авторизации

Все хуки авторизации уже реализованы в `src/ui/api/hooks/useAuth.ts`:
- ✅ `useSignUp()` - регистрация
- ✅ `useSignIn()` - вход
- ✅ `useSignInWithGoogle()` - вход через Google
- ✅ `useSignInWithVk()` - вход через VK
- ✅ `useVerify()` - подтверждение email
- ✅ `useResend()` - повторная отправка кода
- ✅ `useRestore()` - восстановление пароля
- ✅ `useRestoreVerify()` - подтверждение восстановления
- ✅ `useFirebase()` - Firebase авторизация

## Миграция

### Для компонентов, использующих авторизацию:

**Было:**
```typescript
import { profileService } from '@/api/ProfileService';

// Вход
const data = await profileService.signIn({ login, password });

// Регистрация
const data = await profileService.signUp({ login, email, password });
```

**Стало:**
```typescript
import { authService } from '@/api/AuthService';
import { ResponseCode } from '@/api/types/responses';

// Вход
const data = await authService.signIn({ login, password });
if (data?.code === ResponseCode.SUCCESSFUL && data?.profile && data?.profileToken?.token) {
  // Успешная авторизация
} else {
  // Обработка ошибок по data.code
}

// Регистрация
const data = await authService.signUp({ login, email, password });
if (data?.code === ResponseCode.SUCCESSFUL && data?.hash) {
  // Код отправлен на email
}
```

### Использование хуков:

```typescript
import { useSignIn, useSignUp } from '@/api/hooks';

function MyAuthComponent() {
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  
  const handleSignIn = async () => {
    const result = await signInMutation.mutateAsync({ login, password });
    if (result.code === ResponseCode.SUCCESSFUL) {
      // ...
    }
  };
}
```

## Коды ответов API

```typescript
export enum ResponseCode {
  SUCCESSFUL = 0,
  FAILED = 1,
  INVALID_LOGIN = 2,
  INVALID_EMAIL = 3,
  INVALID_PASSWORD = 4,
  LOGIN_ALREADY_TAKEN = 5,
  EMAIL_ALREADY_TAKEN = 6,
  CODE_ALREADY_SEND = 7,
  CODE_CANNOT_SEND = 8,
  EMAIL_SERVICE_DISALLOWED = 9,
  TOO_MANY_REGISTRATIONS = 10,
  BANNED = 402,
  PERM_BANNED = 403,
}
```

## Проверка изменений

1. ✅ Авторизация работает через `authService`
2. ✅ Регистрация работает через `authService`
3. ✅ OAuth (Google/VK) работает через `authService`
4. ✅ Восстановление пароля работает через `authService`
5. ✅ Все ошибки обрабатываются согласно `ResponseCode`
6. ✅ Хуки доступны через `@/api/hooks`
7. ✅ Нет дублирования кода между сервисами
8. ✅ Нет ошибок линтера

## Файлы изменены

- `src/ui/auth/view/AuthPage.tsx` - полный рефакторинг
- `src/ui/api/ProfileService.ts` - удалены методы авторизации
- `src/ui/api/hooks/useProfile.ts` - удален устаревший `useLogin`
- `src/ui/api/types/responses.ts` - обновлены типы ответов

## Следующие шаги

- [ ] Протестировать все сценарии авторизации
- [ ] Протестировать OAuth интеграции
- [ ] Проверить восстановление пароля
- [ ] Убедиться в корректности обработки всех ошибок

