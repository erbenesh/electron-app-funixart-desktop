import React from 'react';
import styles from './AppBar.module.css';

export interface AppBarProps {
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({ title, left, right, className, sticky = true }) => {
  return (
    <header className={[styles.root, sticky ? styles.sticky : '', className].filter(Boolean).join(' ')}>
      <div className={styles.safeTop} />
      <div className={styles.row}>
        <div className={styles.side}>{left}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.side} aria-label="actions">{right}</div>
      </div>
    </header>
  );
};


