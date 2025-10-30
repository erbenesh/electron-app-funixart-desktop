import React from 'react';
import styles from './List.module.css';

export interface ListProps { children: React.ReactNode; }
export const List: React.FC<ListProps> = ({ children }) => <div className={styles.list}>{children}</div>;

export interface ListItemProps {
  leading?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ leading, title, description, trailing, onClick }) => (
  <div className={styles.item} role={onClick ? 'button' : undefined} onClick={onClick}>
    {leading && <div className={styles.leading}>{leading}</div>}
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.desc}>{description}</div>}
    </div>
    {trailing && <div className={styles.trailing}>{trailing}</div>}
  </div>
);


