import React from 'react';
import styles from './Alert.module.css';

type Type = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: Type;
  message: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', message, description, closable, onClose, className, ...rest }) => {
  return (
    <div className={[styles.root, styles[type], className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {closable ? <button className={styles.close} onClick={onClose}>×</button> : null}
    </div>
  );
};

export default Alert;


