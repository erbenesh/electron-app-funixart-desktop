import React from 'react';
import styles from './Result.module.css';

type Status = 'success' | 'info' | 'warning' | 'error' | '404' | '500' | '403';

export interface ResultProps {
  status?: Status;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({ status = 'info', title, subTitle, extra }) => (
  <div className={[styles.root, styles[status]].join(' ')}>
    <div className={styles.icon}>🎯</div>
    <div className={styles.title}>{title}</div>
    {subTitle ? <div className={styles.sub}>{subTitle}</div> : null}
    {extra ? <div className={styles.extra}>{extra}</div> : null}
  </div>
);

export default Result;


