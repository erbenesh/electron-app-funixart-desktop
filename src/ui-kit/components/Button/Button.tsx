import React from 'react';
import styles from './Button.module.css';

type Variant = 'default' | 'primary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  block,
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
    disabled ? styles.disabled : undefined,
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};


