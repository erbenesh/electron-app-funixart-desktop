import React from 'react';
import styles from './Statistic.module.css';

export const Statistic: React.FC<{ label: React.ReactNode; value: React.ReactNode }>
  = ({ label, value }) => (
  <div className={styles.stat}>
    <div className={styles.value}>{value}</div>
    <div className={styles.label}>{label}</div>
  </div>
);


