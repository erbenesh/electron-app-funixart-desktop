# Исправления формы регистрации

## Проблемы, обнаруженные в форме регистрации

### ❌ Проблема 1: Email не был обязательным полем

**До исправления:**
```tsx
<Input
    type="email"
    id="email"
    placeholder="Введите email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={isLoading}
    autoComplete="email"
/>
```

**Проблема**: Отсутствовал атрибут `required`, хотя API требует email как обязательное поле согласно интерфейсу `SignUpRequest`:

```typescript
export interface SignUpRequest {
  login: string;
  email: string;  // Обязательное поле!
  password: string;
}
```

**После исправления:**
```tsx
<label htmlFor="email" className={styles.label}>Email *</label>
<Input
    type="email"
    id="email"
    placeholder="Введите email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required  // ✅ Добавлен required
    disabled={isLoading}
    autoComplete="email"
/>
```

---

### ❌ Проблема 2: Неправильная валидация email

**До исправления:**
```typescript
if (mode !== 'sign-in' && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('Некорректный формат email');
    return;
}
```

**Проблема**: 
- Валидация срабатывает только если email не пустой (`email &&`)
- Не проверяется, что email обязателен для регистрации
- Пользователь может отправить форму без email

**После исправления:**
```typescript
// Сначала проверяем наличие email для регистрации
if (mode === 'sign-up' && !email.trim()) {
    setError('Укажите email');
    return;
}
// Затем проверяем формат
if (mode === 'sign-up' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('Некорректный формат email');
    return;
}
```

---

### ❌ Проблема 3: Некорректный label для поля логина

**До исправления:**
```tsx
<label htmlFor="login" className={styles.label}>
    Логин или email
</label>
<Input
    type="text"
    id="login"
    placeholder="Ваш логин или email"
    value={login}
    onChange={(e) => setLogin(e.target.value)}
    required
/>
```

**Проблема**: 
- Label "Логин или email" вводит в заблуждение при регистрации
- При регистрации требуется отдельный логин И отдельный email
- Пользователь может попытаться ввести email в поле логина

**После исправления:**
```tsx
<label htmlFor="login" className={styles.label}>
    {mode === 'sign-up' ? 'Логин' : 'Логин или email'}
</label>
<Input
    type="text"
    id="login"
    placeholder={mode === 'sign-up' ? 'Введите логин' : 'Ваш логин или email'}
    value={login}
    onChange={(e) => setLogin(e.target.value)}
    required
/>
```

---

## Результат исправлений

### ✅ Теперь форма регистрации:

1. **Требует обязательное заполнение email** с атрибутом `required` и визуальным индикатором `*`
2. **Правильно валидирует email**:
   - Сначала проверяет наличие
   - Затем проверяет формат
3. **Четко показывает назначение полей**:
   - Для регистрации: "Логин" (отдельно) + "Email" (отдельно)
   - Для входа: "Логин или email" (можно использовать любое)
4. **Соответствует API** согласно интерфейсу `SignUpRequest`

### Порядок валидации полей:

```typescript
1. Проверка логина (обязательно)
2. Проверка email для регистрации (обязательно)
3. Проверка формата email для регистрации
4. Проверка длины пароля (минимум 8 символов)
```

### Визуальные улучшения:

- ✅ Label "Email *" с звездочкой показывает, что поле обязательное
- ✅ Разные placeholder'ы для разных режимов
- ✅ HTML5 валидация через атрибут `required`

## Проверка соответствия API

Форма регистрации теперь полностью соответствует требованиям API:

```typescript
// API требует (SignUpRequest)
interface SignUpRequest {
  login: string;    // ✅ Обязательно, валидируется
  email: string;    // ✅ Обязательно, валидируется (было необязательно)
  password: string; // ✅ Обязательно, валидируется (min 8 символов)
}

// Форма отправляет
await authService.signUp({ 
  login,    // ✅ 
  email,    // ✅ Теперь всегда заполнен
  password  // ✅
});
```

## Тестирование

### Сценарии для тестирования:

1. ✅ Попытка регистрации без email → Ошибка "Укажите email"
2. ✅ Попытка регистрации с некорректным email → Ошибка "Некорректный формат email"
3. ✅ Попытка регистрации без логина → Ошибка "Укажите логин"
4. ✅ Попытка регистрации с коротким паролем → Ошибка "Пароль должен быть не менее 8 символов"
5. ✅ Успешная регистрация со всеми полями → Отправка кода на email

## Измененные файлы

- `src/ui/auth/view/AuthPage.tsx` - исправлена валидация и UI формы регистрации

