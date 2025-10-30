import React, { useEffect, useRef } from 'react';

export interface InfiniteScrollProps {
  onReachEnd: () => void;
  rootMargin?: string;
  disabled?: boolean;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onReachEnd, rootMargin = '200px', disabled }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (disabled) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) onReachEnd(); });
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [onReachEnd, rootMargin, disabled]);
  return <div ref={ref} />;
};


