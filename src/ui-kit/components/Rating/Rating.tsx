import React from 'react';
import styles from './Rating.module.css';

export interface RatingProps {
  value?: number; // 0..5
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  allowClear?: boolean;
  size?: number | string; // e.g. 16, '20px', '1.5rem'
}

const MAX = 5;

export const Rating: React.FC<RatingProps> = ({ value, defaultValue = 0, onChange, disabled, allowClear, size }) => {
  const [inner, setInner] = React.useState(defaultValue);
  const isCtrl = typeof value === 'number';
  const curr = isCtrl ? (value as number) : inner;

  const set = (v: number) => {
    const next = allowClear && v === curr ? 0 : v;
    if (!isCtrl) setInner(next);
    onChange?.(next);
  };

  const sizeVar = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={[styles.root, disabled ? styles.disabled : ''].join(' ')} role="radiogroup" aria-label="Рейтинг" style={sizeVar ? ({ ['--rating-size' as any]: sizeVar }) : undefined}>
      {Array.from({ length: MAX }).map((_, i) => {
        const idx = i + 1;
        const filled = idx <= curr;
        return (
          <button
            key={idx}
            type="button"
            className={[styles.star, filled ? styles.filled : ''].join(' ')}
            aria-checked={filled}
            role="radio"
            onClick={() => !disabled && set(idx)}
            disabled={disabled}
            aria-label={`${idx} из ${MAX}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default Rating;


