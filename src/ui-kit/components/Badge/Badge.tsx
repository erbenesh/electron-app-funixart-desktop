import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  count?: number;
  dot?: boolean;
  overflowCount?: number;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ count, dot, overflowCount = 99, children }) => {
  const display = dot ? '•' : typeof count === 'number' ? (count > overflowCount ? `${overflowCount}+` : String(count)) : undefined;
  return (
    <span className={styles.root}>
      {children}
      {display ? (
        <span className={styles.count}>{display}</span>
      ) : null}
    </span>
  );
};

export default Badge;


