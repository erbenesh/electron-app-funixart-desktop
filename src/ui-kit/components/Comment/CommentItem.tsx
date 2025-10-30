import React from 'react';
import styles from './CommentItem.module.css';

export interface CommentItemProps {
  avatar?: React.ReactNode;
  author: React.ReactNode;
  time?: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
}

export const CommentItem: React.FC<CommentItemProps> = ({ avatar, author, time, content, actions }) => (
  <div className={styles.item}>
    {avatar && <div className={styles.avatar}>{avatar}</div>}
    <div className={styles.body}>
      <div className={styles.meta}>
        <span className={styles.author}>{author}</span>
        {time && <span className={styles.time}>{time}</span>}
      </div>
      <div className={styles.content}>{content}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  </div>
);


