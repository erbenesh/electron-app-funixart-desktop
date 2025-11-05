import {
  init,
  bindViewportCssVars,
  isViewportCssVarsBound,
  expandViewport,
  themeParamsState,
} from '@telegram-apps/sdk';

function isTelegramEnv(): boolean {
  // Fallback detection for Telegram WebApp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tg = (window as any)?.Telegram?.WebApp;
  return Boolean(tg);
}

function rgbToCss(rgb?: { r: number; g: number; b: number } | string): string | undefined {
  if (!rgb) return undefined;
  if (typeof rgb === 'string') return rgb;
  const { r, g, b } = rgb;
  return `rgb(${r}, ${g}, ${b})`;
}

export async function initTelegram(): Promise<void> {
  if (!isTelegramEnv()) return;

  try {
    init();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tg: any = (window as any).Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready?.();
        tg.expand?.();
        tg.setBackgroundColor?.('secondary_bg_color');
        tg.setHeaderColor?.('secondary_bg_color');
        // Prevent accidental collapse by swipe-down / overscroll in TG
        tg.disableVerticalSwipes?.();
        
        // Hide Telegram MainButton if it interferes with UI
        if (tg.MainButton) {
          tg.MainButton.hide?.();
        }
        
        // Hide Telegram BackButton - we have our own
        if (tg.BackButton) {
          tg.BackButton.hide?.();
        }
      } catch {}
    }

    if (bindViewportCssVars && bindViewportCssVars.isAvailable && bindViewportCssVars.isAvailable()) {
      bindViewportCssVars();
    }
    if (expandViewport && expandViewport.isAvailable && expandViewport.isAvailable()) {
      expandViewport();
    }

    const theme = themeParamsState ? themeParamsState() : undefined;
    const applyTheme = (t: typeof theme) => {
      if (!t) return;
      const root = document.documentElement.style;
      const set = (key: string, val?: string) => {
        if (val) root.setProperty(key, val);
      };
      set('--tg-theme-text-color', rgbToCss(t.textColor));
      set('--tg-theme-bg-color', rgbToCss(t.backgroundColor));
      set('--tg-theme-button-color', rgbToCss(t.buttonColor));
      set('--tg-theme-button-text-color', rgbToCss(t.buttonTextColor));
      set('--tg-theme-hint-color', rgbToCss(t.hintColor));
      set('--tg-theme-link-color', rgbToCss(t.linkColor));
      set('--tg-theme-secondary-bg-color', rgbToCss(t.secondaryBackgroundColor));
      set('--tg-theme-section-bg-color', rgbToCss(t.sectionBackgroundColor));
      set('--tg-theme-section-separator-color', rgbToCss(t.sectionSeparatorColor));
      set('--tg-theme-section-header-text-color', rgbToCss(t.sectionHeaderTextColor));
      set('--tg-theme-header-bg-color', rgbToCss(t.headerBackgroundColor));
      set('--tg-theme-subtitle-text-color', rgbToCss(t.subtitleTextColor));
      set('--tg-theme-accent-text-color', rgbToCss(t.accentTextColor));
      set('--tg-theme-destructive-text-color', rgbToCss(t.destructiveTextColor));
    };
    if (theme) applyTheme(theme);

    // Listen to theme change events (WebApp API)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)?.Telegram?.WebApp?.onEvent?.('themeChanged', () => {
      try {
        const t = themeParamsState ? themeParamsState() : undefined;
        applyTheme(t);
      } catch {}
    });
  } catch {
    // Silently fail to keep non-Telegram environments working
  }
}

export function isViewportBound(): boolean {
  return Boolean(isViewportCssVarsBound && isViewportCssVarsBound());
}


