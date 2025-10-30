import React, { useState } from 'react';
import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  preview?: boolean;
}

export interface PreviewGroupProps { items: string[]; startIndex?: number; onClose?: () => void }

export const Image: React.FC<ImageProps> = ({ preview = true, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img className={className} onClick={() => preview && setOpen(true)} {...rest} />
      {preview && open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}>
          <img className={styles.preview} src={rest.src} alt={rest.alt} />
        </div>
      )}
    </>
  );
};

export const PreviewGroup: React.FC<PreviewGroupProps> = ({ items, startIndex = 0, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <button className={styles.nav} onClick={(e) => { e.stopPropagation(); setIdx(Math.max(0, idx - 1)); }}>‹</button>
      <img className={styles.preview} src={items[idx]} alt="preview" />
      <button className={styles.nav} onClick={(e) => { e.stopPropagation(); setIdx(Math.min(items.length - 1, idx + 1)); }}>›</button>
    </div>
  );
};

export default Image;


