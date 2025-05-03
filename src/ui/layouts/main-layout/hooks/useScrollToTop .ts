import { useEffect } from 'react';

export const useScrollToTop = (dependencies: any[] = []) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // можно изменить на 'auto' для мгновенной прокрутки
    });
  }, dependencies);
};
