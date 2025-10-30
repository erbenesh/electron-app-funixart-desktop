import React from 'react';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear, leftIcon, rightIcon, loading, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.left}>{leftIcon}</span>
      <input className={styles.input} type="search" value={value} onChange={onChange} {...rest} />
      {loading ? <span className={styles.spinner} /> : rightIcon ? <span className={styles.right}>{rightIcon}</span> : null}
      {value && (
        <button type="button" className={styles.clear} aria-label="Очистить" onClick={onClear}>×</button>
      )}
    </div>
  );
};


