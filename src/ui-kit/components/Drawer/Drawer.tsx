import React, { useEffect } from 'react';
import styles from './Drawer.module.css';
import Portal from '../Portal/Portal';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: string;
  height?: string;
  backdrop?: boolean;
  children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  width = '20rem',
  height = '16rem',
  backdrop = true,
  children,
}) => {
  const panelStyle: React.CSSProperties = {
    // Provide CSS variables so CSS can adapt responsively
    ['--drawer-width' as any]: width,
    ['--drawer-height' as any]: height,
  };

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
        {open && backdrop && (
          <div className={styles.backdrop} onClick={onClose} />
        )}
        <div className={`${styles.panel} ${styles[placement]}`} style={panelStyle}>
          {children}
        </div>
      </div>
    </Portal>
  );
};


