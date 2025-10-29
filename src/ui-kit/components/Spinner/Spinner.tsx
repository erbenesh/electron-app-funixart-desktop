import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement>;

export const Spinner: React.FC<SpinnerProps> = ({ className, ...rest }) => {
  const classNames = [styles.spinner, className].filter(Boolean).join(' ');
  return <div className={classNames} {...rest} />;
};


