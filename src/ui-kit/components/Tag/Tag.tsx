import React from 'react';
import styles from './Tag.module.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  closable?: boolean;
  onClose?: () => void;
}

export const Tag: React.FC<TagProps> = ({ closable, onClose, children, className, ...rest }) => {
  const cls = [styles.tag, className].filter(Boolean).join(' ');
  return (
    <span {...rest} className={cls}>
      {children}
      {closable ? (
        <button type="button" onClick={onClose} aria-label="Close" className={styles.close}>×</button>
      ) : null}
    </span>
  );
};

export default Tag;


