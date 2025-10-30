import React from 'react';
import styles from './DatePicker.module.css';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: string; // ISO date string YYYY-MM-DD
  defaultValue?: string;
  onChange?: (value: string | null) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, defaultValue, onChange, ...rest }) => {
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const isCtrl = typeof value !== 'undefined';
  const curr = isCtrl ? value : inner;

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value || null;
    if (!isCtrl) setInner(v || undefined);
    onChange?.(v);
  };

  return <input className={styles.input} type="date" value={curr} onChange={handle} {...rest} />;
};

export default DatePicker;


