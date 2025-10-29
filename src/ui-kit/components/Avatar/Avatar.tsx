import React from 'react';
import styles from './Avatar.module.css';

type Size = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: Size;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', className, ...rest }) => {
  const classNames = [styles.avatar, size !== 'md' ? styles[size] : undefined, className]
    .filter(Boolean)
    .join(' ');
  return <img className={classNames} {...rest} />;
};


