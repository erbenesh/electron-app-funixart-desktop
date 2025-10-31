import React from 'react';
import styles from './Lightbox.module.css';
import Portal from '../Portal/Portal';

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src?: string; // image source
  alt?: string;
  children?: React.ReactNode; // custom content (e.g., iframe video)
}

export const Lightbox: React.FC<LightboxProps> = ({ open, onClose, src, alt, children }) => {
  if (!open) return null;
  return (
    <Portal>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.center}>
          <div className={styles.box} onClick={(e) => e.stopPropagation()}>
            {children ? (
              children
            ) : (
              <img className={styles.image} src={src!} alt={alt} />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};


