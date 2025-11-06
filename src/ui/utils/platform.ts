/**
 * Определяет, запущено ли приложение в Telegram Mini App
 */
export const isTelegramMiniApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Проверяем наличие Telegram WebApp API
  return !!(window as any).Telegram?.WebApp;
};

/**
 * Применяет CSS переменную для Telegram offset только если приложение запущено в Telegram
 */
export const initializeTelegramOffset = (): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (isTelegramMiniApp()) {
    // В Telegram Mini App оставляем offset для кнопок Telegram
    root.style.setProperty('--tg-header-offset', '60px');
  } else {
    // В обычном браузере убираем offset
    root.style.setProperty('--tg-header-offset', '0px');
  }
};

/**
 * Получает высоту header bar Telegram (если есть)
 */
export const getTelegramHeaderHeight = (): number => {
  if (!isTelegramMiniApp()) return 0;
  
  const webApp = (window as any).Telegram?.WebApp;
  
  // Telegram предоставляет информацию о высоте header
  return webApp?.headerColor ? 60 : 0;
};

