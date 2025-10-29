import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input: React.FC<InputProps> = ({ className, invalid, ...rest }) => {
  const classNames = [styles.input, invalid ? styles.invalid : undefined, className].filter(Boolean).join(' ');
  return <input className={classNames} {...rest} />;
};


