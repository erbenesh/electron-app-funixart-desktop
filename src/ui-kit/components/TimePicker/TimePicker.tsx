import React from 'react';
import styles from './TimePicker.module.css';

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: string; // HH:mm
  defaultValue?: string;
  onChange?: (value: string | null) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, defaultValue, onChange, ...rest }) => {
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const isCtrl = typeof value !== 'undefined';
  const curr = isCtrl ? value : inner;
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value || null;
    if (!isCtrl) setInner(v || undefined);
    onChange?.(v);
  };
  return <input className={styles.input} type="time" value={curr} onChange={handle} {...rest} />;
};

export default TimePicker;


