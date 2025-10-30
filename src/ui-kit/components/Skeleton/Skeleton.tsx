import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  loading?: boolean;
  avatar?: boolean;
  rows?: number;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ loading = true, avatar, rows = 3, children }) => {
  if (!loading) return <>{children}</>;
  return (
    <div className={styles.root}>
      {avatar ? <div className={styles.avatar} /> : null}
      <div className={styles.content}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={styles.line} style={{ width: `${90 - i * 10}%` }} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;


