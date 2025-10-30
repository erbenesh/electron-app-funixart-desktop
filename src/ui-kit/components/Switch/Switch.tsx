import React, { useState } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, defaultChecked, onChange, disabled, ...rest }) => {
  const [inner, setInner] = useState(!!defaultChecked);
  const isControlled = typeof checked !== 'undefined';
  const curr = isControlled ? !!checked : inner;

  const toggle = () => {
    if (disabled) return;
    const next = !curr;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const cls = [styles.root, curr ? styles.on : undefined, disabled ? styles.disabled : undefined].filter(Boolean).join(' ');
  return (
    <button type="button" role="switch" aria-checked={curr} disabled={disabled} onClick={toggle} className={cls} {...rest}>
      <span className={styles.thumb} />
    </button>
  );
};

export default Switch;


