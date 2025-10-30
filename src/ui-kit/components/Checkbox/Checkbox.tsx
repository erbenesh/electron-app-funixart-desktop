import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'defaultChecked'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, defaultChecked, onChange, children, ...rest }) => {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked, e);
  return (
    <label className={styles.label}>
      <input className={styles.box} type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={handle} {...rest} />
      {children}
    </label>
  );
};

export default Checkbox;


