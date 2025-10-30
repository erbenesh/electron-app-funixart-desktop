import React from 'react';
import styles from './Drawer.module.css';

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

  return (
    <div className={`${styles.root} ${open ? styles.open : ''}`}>
      {backdrop && (
        <div className={styles.backdrop} onClick={onClose} />
      )}
      <div className={`${styles.panel} ${styles[placement]}`} style={panelStyle}>
        {children}
      </div>
    </div>
  );
};


