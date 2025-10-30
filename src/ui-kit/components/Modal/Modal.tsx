import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import Portal from '../Portal/Portal';

export interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, title, footer, onClose, children }) => {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);
  if (!open) return null;
  return (
    <Portal>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {title ? <div className={styles.header}>{title}</div> : null}
          <div>{children}</div>
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </div>
      </div>
    </Portal>
  );
};


