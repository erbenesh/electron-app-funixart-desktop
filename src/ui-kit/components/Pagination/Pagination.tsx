import React from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ current, defaultCurrent = 1, pageSize = 10, total = 0, onChange }) => {
  const [inner, setInner] = React.useState(defaultCurrent);
  const isCtrl = typeof current !== 'undefined';
  const curr = isCtrl ? (current as number) : inner;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const goto = (p: number) => {
    const next = Math.min(pages, Math.max(1, p));
    if (!isCtrl) setInner(next);
    onChange?.(next, pageSize);
  };

  return (
    <div className={styles.root}>
      <button className={styles.btn} onClick={() => goto(1)} disabled={curr === 1}>{'<<'}</button>
      <button className={styles.btn} onClick={() => goto(curr - 1)} disabled={curr === 1}>{'<'}</button>
      <span className={styles.info}>{curr} / {pages}</span>
      <button className={styles.btn} onClick={() => goto(curr + 1)} disabled={curr === pages}>{'>'}</button>
      <button className={styles.btn} onClick={() => goto(pages)} disabled={curr === pages}>{'>>'}</button>
    </div>
  );
};

export default Pagination;


