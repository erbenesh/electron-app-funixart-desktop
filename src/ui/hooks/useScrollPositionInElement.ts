import { useState, useEffect } from 'react';

export function useScrollPositionInElement(el: string) {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const element = document.querySelector(el);
    if (!!element) {
      const height = element.scrollHeight - element.clientHeight;

      const windowScroll = element.scrollTop;

      const scrolled = (windowScroll / height) * 100;

      setScrollPosition(scrolled);
    }
  }

  useEffect(() => {
    document.querySelector(el)?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.querySelector(el)?.removeEventListener('scroll', handleScroll);
    };
  });

  return Math.floor(scrollPosition);
}
