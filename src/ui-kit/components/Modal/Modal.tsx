import React from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, title, footer, onClose, children }) => {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title ? <div className={styles.header}>{title}</div> : null}
        <div>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
};


