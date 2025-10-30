import React, { useMemo } from 'react';
import styles from './HorizontalList.module.css';

export interface HorizontalListProps {
  children: React.ReactNode;
  peek?: number; // 0..1 fraction of viewport width
  className?: string;
  arrowsDesktop?: boolean;
}

export const HorizontalList: React.FC<HorizontalListProps> = ({ children, peek = 0.14, className, arrowsDesktop }) => {
  const autoCol = useMemo(() => `${Math.round((1 - peek) * 100)}%`, [peek]);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: number) => {
    const el = ref.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * (1 - peek), behavior: 'smooth' });
  };
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      {arrowsDesktop && <button className={styles.arrowLeft} onClick={() => scrollBy(-1)} aria-label='Prev'>‹</button>}
      <div ref={ref} className={styles.root} style={{ ['--autoCol' as any]: autoCol }}>
        {children}
      </div>
      {arrowsDesktop && <button className={styles.arrowRight} onClick={() => scrollBy(1)} aria-label='Next'>›</button>}
    </div>
  );
};


