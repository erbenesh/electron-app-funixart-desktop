import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ value, defaultValue = 0, min = 0, max = 100, step = 1, onChange, ...rest }) => {
  const [inner, setInner] = React.useState(defaultValue);
  const isCtrl = typeof value === 'number';
  const curr = isCtrl ? (value as number) : inner;
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!isCtrl) setInner(v);
    onChange?.(v);
  };
  return <input className={styles.slider} type="range" value={curr} min={min} max={max} step={step} onChange={handle} {...rest} />;
};

export default Slider;


