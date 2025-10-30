import React, { useEffect } from 'react';
import styles from './BottomSheet.module.css';
import Portal from '../Portal/Portal';
import { FocusTrap } from '../FocusTrap/FocusTrap';

export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  height?: string;
  backdrop?: boolean;
  children?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, height = '60vh', backdrop = true, children }) => {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <Portal>
      <div className={`${styles.root} ${open ? styles.open : ''}`}>
        {open && backdrop && <div className={styles.backdrop} onClick={onClose} />}
        <FocusTrap enabled={open}>
          <div className={styles.sheet} style={{ ['--sheet-height' as any]: height }} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
};


