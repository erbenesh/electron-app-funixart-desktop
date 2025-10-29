import React from 'react';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ wrapperClassName, className, ...rest }) => {
  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}>
      <input type="search" className={[styles.input, className].filter(Boolean).join(' ')} {...rest} />
    </div>
  );
};


