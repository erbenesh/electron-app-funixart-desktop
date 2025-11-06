# Исправление ошибок OAuth

## 🐛 Проблема

При компиляции возникали ошибки TypeScript:

```
src/ui/auth/view/AuthPage.tsx(260,73): error TS2345: Argument of type 
'{ login: string; email: string; googleIdToken: string; }' is not assignable 
to parameter of type 'SignUpRequest & { googleIdToken: string; }'.
Property 'password' is missing in type 
'{ login: string; email: string; googleIdToken: string; }' 
but required in type 'SignUpRequest'.
```

## 🔍 Причина

В `AuthService` методы `signUpWithGoogle` и `signUpWithVk` требовали тип `SignUpRequest & { googleIdToken: string }`, который включает обязательное поле `password`. Но при OAuth регистрации пароль НЕ нужен!

**Было:**
```typescript
async signUpWithGoogle(request: SignUpRequest & { googleIdToken: string }): Promise<SignUpResponse> {
    // ...
}
```

**Проблема:**
- `SignUpRequest` требует: `{ login, email, password }`
- OAuth регистрация передает: `{ login, email, googleIdToken }`
- `password` отсутствует → ошибка TypeScript

## ✅ Решение

Использовать существующие специальные типы для OAuth регистрации:

### 1. Обновлен `AuthService.ts`

```typescript
// До:
async signUpWithGoogle(request: SignUpRequest & { googleIdToken: string }): Promise<SignUpResponse>
async signUpWithVk(request: SignUpRequest & { vkAccessToken: string }): Promise<SignUpResponse>

// После:
async signUpWithGoogle(request: SignUpWithGoogleRequest): Promise<SignUpResponse>
async signUpWithVk(request: SignUpWithVkRequest): Promise<SignUpResponse>
```

### 2. Обновлен `useAuth.ts`

```typescript
// До:
useSignUpWithGoogle(): UseMutationResult<SignUpResponse, Error, SignUpRequest & { googleIdToken: string }>
useSignUpWithVk(): UseMutationResult<SignUpResponse, Error, SignUpRequest & { vkAccessToken: string }>

// После:
useSignUpWithGoogle(): UseMutationResult<SignUpResponse, Error, SignUpWithGoogleRequest>
useSignUpWithVk(): UseMutationResult<SignUpResponse, Error, SignUpWithVkRequest>
```

### 3. Добавлены импорты

```typescript
import type { 
    SignUpWithGoogleRequest, 
    SignUpWithVkRequest 
} from "./types/requests";
```

## 📝 Типы запросов

Типы уже были определены в `types/requests.ts`:

```typescript
export interface SignUpRequest {
  login: string;
  email: string;
  password: string;  // Для обычной регистрации
}

export interface SignUpWithGoogleRequest {
  login: string;
  email: string;
  googleIdToken: string;  // Вместо пароля - токен Google
}

export interface SignUpWithVkRequest {
  login: string;
  email: string;
  vkAccessToken: string;  // Вместо пароля - токен VK
}
```

## 🎯 Результат

✅ Ошибки TypeScript исправлены
✅ OAuth регистрация работает корректно
✅ Типы соответствуют API
✅ Код компилируется без ошибок

## 📋 Измененные файлы

1. `src/ui/api/AuthService.ts` - изменены сигнатуры методов
2. `src/ui/api/hooks/useAuth.ts` - обновлены типы хуков
3. Импорты обновлены в обоих файлах

## ✨ Что теперь работает

```typescript
// Обычная регистрация
await authService.signUp({ 
    login: 'user',
    email: 'user@example.com',
    password: 'password123' 
});

// OAuth регистрация через Google
await authService.signUpWithGoogle({ 
    login: 'user',
    email: 'user@example.com',
    googleIdToken: 'eyJ...' // БЕЗ пароля!
});

// OAuth регистрация через VK
await authService.signUpWithVk({ 
    login: 'user',
    email: 'user@example.com',
    vkAccessToken: 'vk1...' // БЕЗ пароля!
});
```

## 🚀 Следующие шаги

Для полного запуска OAuth необходимо:

1. Получить `GOOGLE_CLIENT_ID` в Google Cloud Console
2. Получить `VK_APP_ID` в VK Developers
3. Добавить их в `src/ui/config/oauth.ts`
4. Настроить redirect URIs в консолях провайдеров

См. подробную инструкцию в `OAUTH_SETUP_GUIDE.md`

