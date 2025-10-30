import React from 'react';
import styles from './AppShell.module.css';

export interface AppShellProps {
  header?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ header, aside, footer, children }) => (
  <div className={styles.root}>
    {header && <div className={styles.header}>{header}</div>}
    <div className={styles.main}>
      {aside && <aside className={styles.aside}>{aside}</aside>}
      <div className={styles.content}>{children}</div>
    </div>
    {footer && <div className={styles.footer}>{footer}</div>}
  </div>
);

export const PageHeader: React.FC<{ title: React.ReactNode; subTitle?: React.ReactNode; extra?: React.ReactNode }>
  = ({ title, subTitle, extra }) => (
  <div className={styles.pageHeader}>
    <div>
      <div className={styles.phTitle}>{title}</div>
      {subTitle && <div className={styles.phSub}>{subTitle}</div>}
    </div>
    {extra && <div className={styles.phExtra}>{extra}</div>}
  </div>
);


