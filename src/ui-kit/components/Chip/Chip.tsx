import React from 'react';
import styles from './Chip.module.css';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ active, className, children, ...rest }) => {
  const classNames = [styles.chip, active ? styles.active : undefined, className].filter(Boolean).join(' ');
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};


