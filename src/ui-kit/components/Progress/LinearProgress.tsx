import React from 'react';
import styles from './LinearProgress.module.css';

export const LinearProgress: React.FC<{ percent?: number; indeterminate?: boolean }>
  = ({ percent = 0, indeterminate }) => (
  <div className={styles.track}>
    <div className={`${styles.bar} ${indeterminate ? styles.indeterminate : ''}`} style={{ width: indeterminate ? undefined : `${percent}%` }} />
  </div>
);

export const TopLoadingBar: React.FC<{ active?: boolean }>
  = ({ active }) => active ? <div className={styles.topbar} /> : null;


