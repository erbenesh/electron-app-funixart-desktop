import { useEffect } from 'react';

export function useOutsideClick(ref: React.RefObject<HTMLElement>, handler: (e: MouseEvent | TouchEvent) => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (!node || node.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [ref, handler, enabled]);
}


