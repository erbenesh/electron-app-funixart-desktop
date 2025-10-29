import React from 'react';
import styles from './MediaCard.module.css';

export interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  link?: React.ReactNode; // optional clickable wrapper provided by consumer
  bottomOverlay?: React.ReactNode; // bottom info section
  overlayStyle?: React.CSSProperties; // gradient/background style for bottom overlay
  mediaClassName?: string; // allow consumer to style the inner <img>
}

export const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  link,
  bottomOverlay,
  overlayStyle,
  className,
  mediaClassName,
  ...rest
}) => {
  const content = (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      <img className={[styles.media, mediaClassName].filter(Boolean).join(' ')} src={imageUrl} alt="media" loading="lazy" />
      {bottomOverlay ? (
        <div className={styles.bottomGradient} style={overlayStyle}>
          {bottomOverlay}
        </div>
      ) : null}
    </div>
  );

  if (link) {
    // Clone the link element and inject the content as its children
    return React.cloneElement(link as React.ReactElement, {
      children: content
    });
  }

  return content;
};


