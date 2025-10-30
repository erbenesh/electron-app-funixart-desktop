import React from 'react';
import styles from './Progress.module.css';

export interface ProgressProps { percent: number; status?: 'normal' | 'success' | 'exception'; showInfo?: boolean; }

export const Progress: React.FC<ProgressProps> = ({ percent, status = 'normal', showInfo = true }) => {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className={[styles.root, styles[status]].join(' ')}>
      <div className={styles.bar} style={{ width: `${p}%` }} />
      {showInfo ? <span className={styles.info}>{p}%</span> : null}
    </div>
  );
};

export default Progress;


