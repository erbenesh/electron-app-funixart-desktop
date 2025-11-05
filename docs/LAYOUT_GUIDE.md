# Layout & Navigation System Guide

## 📐 Layout Architecture

### Component Hierarchy

```
App
├── TopNavigationBar (desktop + mobile search)
├── Toolbar (contextual, release/collection pages only)
├── Content Area
│   ├── Page (with topOffset)
│   │   └── Container (max-width wrapper)
│   │       └── Component Content
└── MobileNavBar (mobile only, bottom)
```

---

## 🎯 Z-Index System

Unified z-index scale defined in `src/ui/index.css`:

```css
--z-content: 1        /* Regular content */
--z-sticky: 50        /* Sticky elements */
--z-header: 100       /* TopNavigationBar */
--z-toolbar: 110      /* Toolbar (back/share) */
--z-mobile-nav: 120   /* Bottom navigation */
--z-dropdown: 200     /* Dropdowns, notifications panel */
--z-overlay: 500      /* Search results overlay */
--z-modal: 1000       /* Modals, Lightbox */
--z-toast: 1100       /* Toast notifications */
--z-tooltip: 1200     /* Tooltips */
```

### Usage Example:
```css
.my_fixed_header {
  z-index: var(--z-header);
}
```

---

## 📱 Responsive Breakpoints

```css
--bp-xs: 480px    /* Small phones */
--bp-sm: 576px    /* Large phones */
--bp-md: 768px    /* Tablets */
--bp-lg: 992px    /* Small desktops */
--bp-xl: 1200px   /* Large desktops */
--bp-xxl: 1600px  /* Extra large screens */
```

### Navigation Visibility

| Element | ≤768px (Mobile) | >768px (Desktop) |
|---------|-----------------|------------------|
| TopNavigationBar - Nav Buttons | Hidden ❌ | Visible ✅ |
| TopNavigationBar - Search | Visible ✅ | Visible ✅ |
| TopNavigationBar - Settings | Visible ✅ | Visible ✅ |
| TopNavigationBar - Notifications | Visible ✅ | Visible ✅ |
| MobileNavBar (bottom) | Visible ✅ | Hidden ❌ |

### Progressive Button Hiding (Desktop)

```css
/* Medium screens (900-1024px) */
- Hide: "Лента" button

/* Tablets (1024-1100px) */
- Hide: "Лента" button  

/* Small tablets (≤900px) */
- Hide: "Коллекции" + "Лента"

/* Mobile (≤768px) */
- Hide: ALL nav buttons (use bottom nav)
```

---

## 📏 Header Height System

Dynamic header height based on platform:

```css
/* Desktop */
--header-height: 70px;

/* Mobile */
--header-height: calc(64px + env(safe-area-inset-top, 0));

/* iOS with Dynamic Island/Notch */
--header-height: max(64px, calc(64px + env(safe-area-inset-top, 0)));
```

### Content Padding

**Before:** Double padding (App.content + Page)
```css
/* ❌ WRONG */
.content {
  padding-top: var(--header-height); /* 70px */
}
.page {
  padding-top: 4rem; /* +64px = 134px total! */
}
```

**After:** Single padding in Page component
```css
/* ✅ CORRECT */
.content {
  padding-top: 0; /* No padding */
}
.page {
  padding-top: var(--header-height); /* 70px */
}
.top_md {
  padding-top: calc(var(--header-height) + 4rem); /* 70px + 64px = 134px */
}
```

---

## 🌍 Platform Support

### Telegram Mini App

**Initialization:**
- `@telegram-apps/sdk` for WebApp API
- Called in `Provider.tsx` on mount
- Theme variables applied automatically
- Viewport expanded to full screen
- Vertical swipes disabled

**Theme Integration:**
```css
color: var(--tg-theme-text-color, rgb(230, 230, 230));
background-color: var(--tg-theme-bg-color, #242424);
```

### iOS

**Safe Areas:**
```css
padding-top: max(0.75rem, calc(env(safe-area-inset-top, 0) + 0.5rem));
padding-bottom: max(.6rem, calc(.6rem + env(safe-area-inset-bottom, 0)));
```

**Overscroll Prevention:**
```css
html[data-tg-platform="ios"] body {
  position: fixed;
  overflow: hidden;
}
html[data-tg-platform="ios"] #root {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
```

**Touch Behavior:**
- Momentum scrolling enabled
- Rubber-banding prevented
- Pull-to-refresh disabled
- Touch callout disabled

### Android

**Touch Behavior:**
```css
html[data-tg-platform="android"] body {
  touch-action: pan-y pinch-zoom;
}
```

**Gesture Navigation:**
```css
html[data-tg-platform="android"] .wrapper {
  padding-bottom: max(5.5rem, calc(5.5rem + env(safe-area-inset-bottom, 0)));
}
```

### Windows Desktop

**Features:**
- Full navigation menu in header
- Custom scrollbar styling
- Hover states for all interactive elements
- Keyboard navigation support
- Focus-visible outlines

---

## 🎨 Component Sizes

### Desktop (>768px)

```
TopNavigationBar:
- Height: ~70px (with padding)
- Nav buttons: Standard Button size
- Icon buttons: 3rem (48px)
- Icons in buttons: 1.75rem (28px)
- Search field: 16rem → 28rem on focus
- Gap: 1.25rem

MobileNavBar:
- Hidden (display: none)

Toolbar:
- Buttons: 2.5rem (40px)
- Icons: 2.5rem (back), 1.5rem (share)
```

### Mobile (≤768px)

```
TopNavigationBar:
- Height: ~64px + safe-area-inset-top
- Icon buttons: 2.75rem (44px) - touch target
- Icons: 1.5rem (24px)
- Search: full width
- Gap: 0.75rem

MobileNavBar:
- Height: ~56px + safe-area-inset-bottom
- Items: min-height 44px (touch target)
- Icons: 1.5rem (24px)
- 5 navigation items in grid

Toolbar:
- Buttons: 2.5rem (40px)
- Same as desktop
```

### Very Small (≤360px)

```
TopNavigationBar:
- Icon buttons: 2.5rem (40px)
- Icons: 1.25rem (20px)
- Gap: 0.5rem
- More compact spacing
```

---

## 🔄 Swipe Navigation

**Enabled:** Mobile only (≤768px)

**Gesture:**
- Start: Within 24px from left edge
- Direction: Right (back)
- Min distance: 120px
- Max angle: 25° from horizontal
- Min duration: 120ms

**Behavior:**
- Navigate back in history
- Prevented on root page (`/`)
- Doesn't interfere with horizontal scrolling
- Passive event listeners for performance

---

## ♿ Accessibility

### Touch Targets

All interactive elements meet WCAG 2.1 guidelines:
- **Minimum:** 44px × 44px
- Buttons use `min-height: 44px`
- Mobile nav items: `min-height: 44px`

### Keyboard Navigation

- ✅ All interactive elements focusable
- ✅ `focus-visible` outlines (2px orange)
- ✅ No outline on mouse click
- ✅ Tab order follows visual order
- ✅ Escape key closes overlays

### Screen Readers

- ✅ `aria-label` on icon-only buttons
- ✅ `aria-expanded` on dropdowns
- ✅ `role="button"` on clickable divs
- ✅ Alt text on images

---

## 🚀 Performance Optimizations

### 1. **CSS Transform Optimizations**
```css
transform: translateZ(0); /* Force GPU acceleration */
will-change: transform;   /* Hint browser for optimization */
```

### 2. **Passive Event Listeners**
```typescript
window.addEventListener('touchstart', handler, { passive: true });
window.addEventListener('scroll', handler, { passive: true });
```

### 3. **Lazy Loading**
- All routes lazy loaded via `React.lazy()`
- Images use `loading="lazy"`
- Infinite scroll with `InfiniteQuery`

### 4. **Memoization**
- ReleaseCard: `memo()` with id comparison
- ReleaseListCard: `memo()` with id comparison
- Callback functions: `useCallback()`

### 5. **CSS Containment**
```css
.card {
  contain: layout style paint;
}
```

---

## 📊 Layout Debugging

### Check Safe Areas (iOS)

```javascript
console.log({
  top: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)'),
  bottom: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)'),
});
```

### Check Platform Detection

```javascript
const platform = document.documentElement.getAttribute('data-tg-platform');
console.log('Platform:', platform); // ios | android | web
```

### Check Header Height

```javascript
const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
console.log('Header height:', headerHeight);
```

---

## 🐛 Common Issues & Solutions

### Issue: Content under header

**Solution:** Ensure Page component has `topOffset` or uses padding-top

```tsx
<Page topOffset="md"> {/* Adds header-height + 4rem */}
  <Container>
    {/* content */}
  </Container>
</Page>
```

### Issue: Buttons not visible on mobile

**Check:**
1. Z-index hierarchy
2. `pointer-events: all` on container
3. Safe area insets applied
4. Not hidden by media query

### Issue: Horizontal overflow

**Solutions:**
```css
body, #root {
  overflow-x: hidden;
}
.content_wrap {
  overflow-x: hidden;
}
img, video {
  max-width: 100%;
}
```

### Issue: Pull-to-refresh on iOS

**Solution:** Already implemented
```css
html[data-tg-platform="ios"] body {
  position: fixed;
  overflow: hidden;
}
```

---

## 📱 Testing Checklist

### Desktop (Windows)
- [ ] Navigation buttons visible
- [ ] Hover states work
- [ ] Focus visible on tab
- [ ] Scrollbar styled
- [ ] Window resize smooth
- [ ] 125% and 150% zoom

### Mobile (Generic)
- [ ] Bottom nav visible
- [ ] Top nav shows search + actions
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll
- [ ] Swipe back works

### iOS Safari
- [ ] Safe areas respected (notch)
- [ ] No rubber-banding
- [ ] Momentum scrolling works
- [ ] No pull-to-refresh
- [ ] Touch callout disabled

### Android Chrome
- [ ] Safe areas respected (gesture nav)
- [ ] Pinch zoom works (when allowed)
- [ ] No overscroll glow
- [ ] Back button works
- [ ] Status bar themed

### Telegram Mini App
- [ ] Theme variables applied
- [ ] Viewport expanded
- [ ] Safe areas work
- [ ] Back button integrated
- [ ] Theme switching works
- [ ] No vertical swipe collapse

---

## 🔧 Quick Fixes

### Add new navigation button

```tsx
// TopNavigationBar.tsx
<div className={styles.nav_buttons}>
  {/* ... existing buttons ... */}
  <NavLink to="/new-page">
    {({ isActive }) => (
      <Button variant={isActive ? 'primary' : 'ghost'}>
        Новая страница
      </Button>
    )}
  </NavLink>
</div>
```

**Note:** Will auto-hide on smaller screens based on breakpoints

### Change view mode

```typescript
import { usePreferencesStore } from '#/api/preferences';

const setParams = usePreferencesStore(s => s.setParams);
setParams({ releaseListViewMode: 'list' }); // or 'grid'
```

### Add safe-area to new fixed element

```css
.my_fixed_element {
  position: fixed;
  top: 0;
  padding-top: max(0.5rem, calc(env(safe-area-inset-top, 0) + 0.5rem));
}
```

---

## 📚 References

- [Telegram WebApp API](https://core.telegram.org/bots/webapps)
- [Safe Area Insets](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)
- [WCAG 2.1 Touch Targets](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)

---

*Last updated: 2025-11-05*

