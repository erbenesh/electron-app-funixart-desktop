import React, { useMemo, useRef, useState, useLayoutEffect } from 'react';

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number; // px
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  height?: number | string;
}

export function VirtualList<T>({ items, itemHeight, overscan = 4, renderItem, className, height = 400 }: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const total = items.length * itemHeight;
  const viewHeight = typeof height === 'number' ? height : 400;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + viewHeight) / itemHeight) + overscan);
  const slice = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ overflow: 'auto', position: 'relative', height }}>
      <div style={{ height: total, position: 'relative' }}>
        <div style={{ position: 'absolute', top: startIndex * itemHeight, left: 0, right: 0 }}>
          {slice.map((it, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {renderItem(it, startIndex + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


