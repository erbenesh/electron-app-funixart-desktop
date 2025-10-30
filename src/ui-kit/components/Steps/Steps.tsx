import React from 'react';
import styles from './Steps.module.css';

export interface StepItem { title: React.ReactNode; description?: React.ReactNode; }

export interface StepsProps { current?: number; items: StepItem[]; }

export const Steps: React.FC<StepsProps> = ({ current = 0, items }) => {
  return (
    <div className={styles.root}>
      {items.map((s, i) => (
        <div key={i} className={[styles.step, i < current ? styles.done : undefined, i === current ? styles.active : undefined].filter(Boolean).join(' ')}>
          <div className={styles.dot}>{i + 1}</div>
          <div className={styles.meta}>
            <div className={styles.title}>{s.title}</div>
            {s.description ? <div className={styles.desc}>{s.description}</div> : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;


