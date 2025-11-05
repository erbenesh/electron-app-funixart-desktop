import React from 'react';
import styles from './Player.module.css';

export interface PlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

export const Player: React.FC<PlayerProps> = ({ src, poster, className, controls = true, ...rest }) => {
  const cls = [styles.player, className].filter(Boolean).join(' ');
  return (
    <div className={styles.wrapper}>
      <video
        className={cls}
        src={src}
        poster={poster}
        controls={controls}
        playsInline
        // @ts-ignore - iOS inline playback attribute
        webkit-playsinline="true"
        {...rest}
      />
    </div>
  );
};


