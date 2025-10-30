import React from 'react';
import styles from './Result.module.css';

export type ResultStatus = 'success' | 'info' | 'warning' | 'error';

export interface ResultProps {
  status?: ResultStatus;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({ status = 'info', title, subTitle, extra }) => (
  <div className={[styles.root, styles[status]].join(' ')}>
    <div className={styles.icon} aria-hidden>
      {status === 'success' && '✔'}
      {status === 'info' && 'ℹ'}
      {status === 'warning' && '⚠'}
      {status === 'error' && '✖'}
    </div>
    {title && <div className={styles.title}>{title}</div>}
    {subTitle && <div className={styles.sub}>{subTitle}</div>}
    {extra && <div className={styles.extra}>{extra}</div>}
  </div>
);

export default Result;


