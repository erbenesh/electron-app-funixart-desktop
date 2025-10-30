import React, { useRef, useState } from 'react';
import styles from './PullToRefresh.module.css';

export interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  children?: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, threshold = 60, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (ref.current && ref.current.scrollTop === 0) startY.current = e.touches[0].clientY;
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (startY.current == null || loading) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) { e.preventDefault(); setOffset(Math.min(dy / 2, threshold * 1.5)); }
  };
  const onTouchEnd = async () => {
    if (offset >= threshold && !loading) {
      setLoading(true);
      await onRefresh();
    }
    setOffset(0); setLoading(false); startY.current = null;
  };

  return (
    <div ref={ref} className={styles.container} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className={styles.pull} style={{ height: offset }}>{loading ? 'Обновление…' : 'Потяните, чтобы обновить'}</div>
      {children}
    </div>
  );
};


