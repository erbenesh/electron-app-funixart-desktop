import React from 'react';
import styles from './Table.module.css';

export interface Column<T> {
  title: React.ReactNode;
  dataIndex?: keyof T;
  key?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey?: (record: T) => string | number;
}

export function Table<T extends Record<string, any>>({ columns, dataSource, rowKey }: TableProps<T>) {
  const getKey = (rec: T, i: number) => (rowKey ? rowKey(rec) : i);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={c.key || String(c.dataIndex || i)}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((rec, ri) => (
          <tr key={getKey(rec, ri)}>
            {columns.map((c, ci) => {
              const val = c.dataIndex ? rec[c.dataIndex] : undefined;
              return (
                <td key={c.key || String(c.dataIndex || ci)}>{c.render ? c.render(val, rec, ri) : val}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;


