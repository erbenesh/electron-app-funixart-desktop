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

    if (bindViewportCssVars && bindViewportCssVars.isAvailable && bindViewportCssVars.isAvailable()) {
      bindViewportCssVars();
    }
    if (expandViewport && expandViewport.isAvailable && expandViewport.isAvailable()) {
      expandViewport();
    }

    const theme = themeParamsState ? themeParamsState() : undefined;
    if (theme) {
      const root = document.documentElement.style;
      const set = (key: string, val?: string) => {
        if (val) root.setProperty(key, val);
      };
      set('--tg-theme-text-color', rgbToCss(theme.textColor));
      set('--tg-theme-bg-color', rgbToCss(theme.backgroundColor));
      set('--tg-theme-button-color', rgbToCss(theme.buttonColor));
      set('--tg-theme-button-text-color', rgbToCss(theme.buttonTextColor));
      set('--tg-theme-hint-color', rgbToCss(theme.hintColor));
      set('--tg-theme-link-color', rgbToCss(theme.linkColor));
      set('--tg-theme-secondary-bg-color', rgbToCss(theme.secondaryBackgroundColor));
      set('--tg-theme-section-bg-color', rgbToCss(theme.sectionBackgroundColor));
      set('--tg-theme-section-separator-color', rgbToCss(theme.sectionSeparatorColor));
      set('--tg-theme-section-header-text-color', rgbToCss(theme.sectionHeaderTextColor));
      set('--tg-theme-header-bg-color', rgbToCss(theme.headerBackgroundColor));
      set('--tg-theme-subtitle-text-color', rgbToCss(theme.subtitleTextColor));
      set('--tg-theme-accent-text-color', rgbToCss(theme.accentTextColor));
      set('--tg-theme-destructive-text-color', rgbToCss(theme.destructiveTextColor));
    }
  } catch {
    // Silently fail to keep non-Telegram environments working
  }
}

export function isViewportBound(): boolean {
  return Boolean(isViewportCssVarsBound && isViewportCssVarsBound());
}


