import React from 'react';
import styles from './Empty.module.css';

export interface EmptyProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({ title = 'Ничего нет', description, action }) => (
  <div className={styles.root}>
    <div className={styles.illustration} />
    <div className={styles.title}>{title}</div>
    {description && <div className={styles.desc}>{description}</div>}
    {action}
  </div>
);

export default Empty;


