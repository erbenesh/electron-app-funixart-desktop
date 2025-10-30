import React from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, extra }) => (
  <div className={styles.root}>
    <div className={styles.texts}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
    {extra && <div className={styles.extra}>{extra}</div>}
  </div>
);


