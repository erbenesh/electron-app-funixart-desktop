import React from 'react';
import styles from './Lightbox.module.css';
import Portal from '../Portal/Portal';

export const Lightbox: React.FC<{ src: string; open: boolean; onClose: () => void; alt?: string }>
  = ({ src, open, onClose, alt }) => {
  if (!open) return null;
  return (
    <Portal>
      <div className={styles.backdrop} onClick={onClose}>
        <img className={styles.image} src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
      </div>
    </Portal>
  );
};


