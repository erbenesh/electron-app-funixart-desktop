import React from 'react';
import styles from './Button.module.css';

type Variant = 'default' | 'primary' | 'ghost' | 'danger' | 'dashed' | 'text' | 'link';
type Size = 'sm' | 'md' | 'lg';
type Shape = 'default' | 'round' | 'circle';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  shape?: Shape;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  block,
  shape = 'default',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...rest
}) => {
  const classNames = [
    styles.button,
    variant !== 'default' ? styles[variant] : undefined,
    size !== 'md' ? styles[size] : undefined,
    block ? styles.block : undefined,
    shape !== 'default' ? styles[shape] : undefined,
    disabled ? styles.disabled : undefined,
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled || loading} {...rest}>
      {loading ? <span className={styles.spinner} /> : leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};


