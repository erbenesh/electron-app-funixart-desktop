import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'defaultChecked'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio: React.FC<RadioProps> = ({ checked, defaultChecked, onChange, children, name, ...rest }) => {
  return (
    <label className={styles.label}>
      <input className={styles.circle} type="radio" name={name} checked={checked} defaultChecked={defaultChecked} onChange={onChange} {...rest} />
      {children}
    </label>
  );
};

export default Radio;


