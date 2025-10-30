import React, { useMemo } from 'react';
import styles from './HorizontalList.module.css';

export interface HorizontalListProps {
  children: React.ReactNode;
  peek?: number; // 0..1 fraction of viewport width
  className?: string;
}

export const HorizontalList: React.FC<HorizontalListProps> = ({ children, peek = 0.14, className }) => {
  const autoCol = useMemo(() => `${Math.round((1 - peek) * 100)}%`, [peek]);
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} style={{ ['--autoCol' as any]: autoCol }}>
      {children}
    </div>
  );
};


