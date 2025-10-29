import React from 'react';
import styles from './IconButton.module.css';

type Variant = 'default' | 'primary' | 'ghost';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode; // icon
}

export const IconButton: React.FC<IconButtonProps> = ({ variant = 'default', className, disabled, children, ...rest }) => {
  const classNames = [styles.iconButton, variant !== 'default' ? styles[variant] : undefined, disabled ? styles.disabled : undefined, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};


