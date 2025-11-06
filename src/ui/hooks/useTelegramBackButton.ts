import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk';

/**
 * Hook for managing Telegram's native back button
 * Shows/hides the button based on navigation stack and handles clicks
 */
export const useTelegramBackButton = (options?: {
  /** Show back button only on specific routes */
  showOnRoutes?: string[];
  /** Hide back button on specific routes */
  hideOnRoutes?: string[];
  /** Custom back handler (overrides default browser back) */
  onBack?: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if back button is supported
    if (!backButton.isSupported()) {
      return;
    }

    // Mount the back button if not already mounted
    if (!backButton.isMounted() && backButton.mount.isAvailable()) {
      backButton.mount();
    }

    const currentPath = location.pathname;
    
    // Determine if back button should be shown
    let shouldShow = true;

    // Hide on root path by default
    if (currentPath === '/' || currentPath === '/home') {
      shouldShow = false;
    }

    // Apply custom show/hide rules
    if (options?.showOnRoutes) {
      shouldShow = options.showOnRoutes.some(route => currentPath.startsWith(route));
    }
    
    if (options?.hideOnRoutes) {
      const shouldHide = options.hideOnRoutes.some(route => currentPath.startsWith(route));
      if (shouldHide) shouldShow = false;
    }

    // Show or hide the button
    if (shouldShow && backButton.show.isAvailable()) {
      backButton.show();
    } else if (!shouldShow && backButton.hide.isAvailable()) {
      backButton.hide();
    }

    // Set up click handler
    const handleClick = () => {
      if (options?.onBack) {
        options.onBack();
      } else {
        // Default behavior: go back in history
        navigate(-1);
      }
    };

    // Attach click listener
    let cleanup: (() => void) | undefined;
    if (backButton.onClick.isAvailable()) {
      cleanup = backButton.onClick(handleClick);
    }

    // Cleanup on unmount or path change
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [location.pathname, navigate, options]);

  return {
    show: () => backButton.show.ifAvailable(),
    hide: () => backButton.hide.ifAvailable(),
    isVisible: backButton.isSupported() && backButton.isMounted() ? backButton.isVisible : () => false,
  };
};

