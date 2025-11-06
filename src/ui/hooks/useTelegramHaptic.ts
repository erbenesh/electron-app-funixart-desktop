import { useCallback } from 'react';
import { hapticFeedback } from '@telegram-apps/sdk';

/**
 * Hook for Telegram haptic feedback
 * Provides methods for different types of haptic notifications
 */
export const useTelegramHaptic = () => {
  const impactOccurred = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    if (hapticFeedback.impactOccurred.isAvailable()) {
      hapticFeedback.impactOccurred(style);
    }
  }, []);

  const notificationOccurred = useCallback((type: 'error' | 'success' | 'warning') => {
    if (hapticFeedback.notificationOccurred.isAvailable()) {
      hapticFeedback.notificationOccurred(type);
    }
  }, []);

  const selectionChanged = useCallback(() => {
    if (hapticFeedback.selectionChanged.isAvailable()) {
      hapticFeedback.selectionChanged();
    }
  }, []);

  return {
    impact: impactOccurred,
    notification: notificationOccurred,
    selectionChanged,
    isSupported: hapticFeedback.isSupported(),
  };
};

