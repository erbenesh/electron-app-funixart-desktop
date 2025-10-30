import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
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

  // Ensure localized placeholder/title via dayjs (browser date input renders locale automatically, but we expose formatted title attribute)
  const title = curr ? dayjs(curr).locale('ru').format('D MMMM YYYY') : undefined;
  return <input className={styles.input} type="date" value={curr} onChange={handle} title={title} {...rest} />;
};

export default DatePicker;


