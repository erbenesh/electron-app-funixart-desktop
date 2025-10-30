import React, { useState } from 'react';
import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  preview?: boolean;
}

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

export default Image;


