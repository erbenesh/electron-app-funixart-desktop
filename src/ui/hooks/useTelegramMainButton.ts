import { useEffect, useCallback } from 'react';
import { mainButton } from '@telegram-apps/sdk';

export interface MainButtonParams {
  text: string;
  isVisible?: boolean;
  isEnabled?: boolean;
  isLoaderVisible?: boolean;
  backgroundColor?: string;
  textColor?: string;
  hasShineEffect?: boolean;
  onClick?: () => void;
}

/**
 * Hook for managing Telegram's native main button
 * Provides a simple API to configure and control the bottom action button
 */
export const useTelegramMainButton = (params?: MainButtonParams) => {
  useEffect(() => {
    // Check if main button is supported
    if (!mainButton.isSupported()) {
      return;
    }

    // Mount the main button if not already mounted
    if (!mainButton.isMounted() && mainButton.mount.isAvailable()) {
      mainButton.mount();
    }

    // Configure button if params provided
    if (params && mainButton.setParams.isAvailable()) {
      const buttonConfig: any = {
        text: params.text,
        isVisible: params.isVisible ?? true,
        isEnabled: params.isEnabled ?? true,
      };

      if (params.isLoaderVisible !== undefined) {
        buttonConfig.isLoaderVisible = params.isLoaderVisible;
      }
      if (params.backgroundColor) {
        buttonConfig.backgroundColor = params.backgroundColor;
      }
      if (params.textColor) {
        buttonConfig.textColor = params.textColor;
      }
      if (params.hasShineEffect !== undefined) {
        buttonConfig.hasShineEffect = params.hasShineEffect;
      }

      mainButton.setParams(buttonConfig);
    }

    // Set up click handler
    let cleanup: (() => void) | undefined;
    if (params?.onClick && mainButton.onClick.isAvailable()) {
      cleanup = mainButton.onClick(params.onClick);
    }

    // Cleanup on unmount
    return () => {
      if (cleanup) {
        cleanup();
      }
      // Hide button when component unmounts
      if (mainButton.hide.isAvailable()) {
        mainButton.hide();
      }
    };
  }, [params]);

  const show = useCallback(() => {
    if (mainButton.show.isAvailable()) {
      mainButton.show();
    }
  }, []);

  const hide = useCallback(() => {
    if (mainButton.hide.isAvailable()) {
      mainButton.hide();
    }
  }, []);

  const enable = useCallback(() => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({ isEnabled: true });
    }
  }, []);

  const disable = useCallback(() => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({ isEnabled: false });
    }
  }, []);

  const showLoader = useCallback(() => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({ isLoaderVisible: true });
    }
  }, []);

  const hideLoader = useCallback(() => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({ isLoaderVisible: false });
    }
  }, []);

  const setText = useCallback((text: string) => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({ text });
    }
  }, []);

  return {
    show,
    hide,
    enable,
    disable,
    showLoader,
    hideLoader,
    setText,
    isSupported: mainButton.isSupported(),
  };
};

