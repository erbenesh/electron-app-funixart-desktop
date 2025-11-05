import { useEffect, useState } from 'react';
import { useScrollPosition } from './useScrollPosition';

interface UseHeaderVisibilityOptions {
  threshold?: number;
  hideDelay?: number;
}

export function useHeaderVisibility(options: UseHeaderVisibilityOptions = {}) {
  const { threshold = 1, hideDelay = 2 } = options;
  
  const scrollPosition = useScrollPosition();
  const [lastScrolledPos, setLastScrolledPos] = useState(0);
  const [lastShowPos, setLastShowPos] = useState(0);
  const [isHeaderHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    if (scrollPosition > threshold && scrollPosition > lastScrolledPos) {
      setLastShowPos(scrollPosition);
      setHeaderHidden(true);
    } else if (scrollPosition <= Math.max(lastShowPos - hideDelay, 0)) {
      setHeaderHidden(false);
    }

    setLastScrolledPos(scrollPosition);
  }, [scrollPosition, lastScrolledPos, lastShowPos, threshold, hideDelay]);

  return { isHeaderHidden, scrollPosition };
}

