UI Kit
======

Lightweight reusable component library for the app (Windows + Telegram app reuse).

Install/Use
-----------

Import components directly from `src/ui-kit` within this repo:

```tsx
import { ThemeProvider, Button, Input, Card } from '@/ui-kit';

export function Example() {
  return (
    <ThemeProvider>
      <Card>
        <Input placeholder="Email" />
        <Button variant="primary">Sign in</Button>
      </Card>
    </ThemeProvider>
  );
}
```

Components
----------

- Button, IconButton
- Input, TextArea
- Card, Avatar
- Spinner
- Modal
- Tabs
- Tooltip

Theming
-------

Tokens live in `src/ui-kit/theme/tokens.css`. Switch light theme by wrapping with `ThemeProvider` and `theme="light"`.


