import React from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ children, action }) => (
  <div className={styles.root}>
    <h2 className={styles.title}>{children}</h2>
    {action && <div className={styles.action}>{action}</div>}
  </div>
);


