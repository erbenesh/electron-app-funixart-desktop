import {
  init,
  bindViewportCssVars,
  isViewportCssVarsBound,
  expandViewport,
  themeParams,
  miniApp,
  viewport,
  backButton,
  mainButton,
  hapticFeedback,
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

/**
 * Initialize Telegram Mini Apps SDK with all components
 * Following best practices from official documentation
 */
export async function initTelegram(): Promise<void> {
  if (!isTelegramEnv()) return;

  try {
    // Initialize the SDK - must be called first
    init();

    // Mount theme params first (required by other components)
    if (themeParams.mount.isAvailable()) {
      await themeParams.mount();
    }

    // Mount and configure Mini App
    if (miniApp.mount.isAvailable()) {
      await miniApp.mount();
      
      // Signal that app is ready
      if (miniApp.ready.isAvailable()) {
        miniApp.ready();
      }

      // Set colors using theme
      if (miniApp.setHeaderColor.isAvailable()) {
        miniApp.setHeaderColor('secondary_bg_color');
      }
      
      if (miniApp.setBackgroundColor.isAvailable()) {
        miniApp.setBackgroundColor('#1a1a1a');
      }
    }

    // Configure viewport
    if (viewport.mount.isAvailable()) {
      viewport.mount();
      
      // Expand viewport to full screen
      if (viewport.expand.isAvailable()) {
        viewport.expand();
      }

      // Bind viewport CSS variables for responsive design
      if (viewport.bindCssVars.isAvailable()) {
        viewport.bindCssVars();
      }
    }

    // Mount back button (will be controlled by useBackButton hook)
    if (backButton.isSupported() && backButton.mount.isAvailable()) {
      backButton.mount();
      // Hide by default, will be shown by navigation logic
      if (backButton.hide.isAvailable()) {
        backButton.hide();
      }
    }

    // Mount main button (will be controlled by useMainButton hook)
    if (mainButton.isSupported() && mainButton.mount.isAvailable()) {
      mainButton.mount();
      // Hide by default
      if (mainButton.hide.isAvailable()) {
        mainButton.hide();
      }
    }

    // Fallback to legacy WebApp API if SDK methods not available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tg: any = (window as any).Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready?.();
        tg.expand?.();
        // Prevent accidental collapse by swipe-down / overscroll in TG
        tg.disableVerticalSwipes?.();
      } catch {}
    }

    // Apply theme colors to CSS variables
    const applyTheme = () => {
      if (!themeParams.isMounted()) return;
      
      const theme = themeParams.state();
      if (!theme) return;
      
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
    };
    
    applyTheme();

    // Listen to theme change events
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)?.Telegram?.WebApp?.onEvent?.('themeChanged', () => {
      try {
        applyTheme();
      } catch {}
    });

    console.log('Telegram Mini Apps SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram SDK:', error);
    // Silently fail to keep non-Telegram environments working
  }
}

export function isViewportBound(): boolean {
  return Boolean(isViewportCssVarsBound && isViewportCssVarsBound());
}

export function isTelegramInitialized(): boolean {
  return isTelegramEnv();
}


