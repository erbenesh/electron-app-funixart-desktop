import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import Portal from '../Portal/Portal';
import { motion, AnimatePresence } from 'framer-motion';

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
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div className={styles.backdrop} onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} onClick={(e) => e.stopPropagation()}
              initial={{ scale: .96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .96, opacity: 0 }}>
              {title ? <div className={styles.header}>{title}</div> : null}
              <div>{children}</div>
              {footer ? <div className={styles.footer}>{footer}</div> : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};


