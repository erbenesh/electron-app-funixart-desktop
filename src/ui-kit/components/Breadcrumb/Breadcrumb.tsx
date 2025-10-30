import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  title: React.ReactNode;
  href?: string;
  onClick?: () => void;
  overlay?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {item.overlay ? (
            <span className={styles.dropdown}>
              {item.href ? (
                <a className={styles.link} href={item.href} onClick={item.onClick}>{item.title}</a>
              ) : (
                <span className={styles.link}>{item.title}</span>
              )}
              <div className={styles.dropdownMenu}>{item.overlay}</div>
            </span>
          ) : item.href ? (
            <a className={styles.link} href={item.href} onClick={item.onClick}>{item.title}</a>
          ) : (
            <span>{item.title}</span>
          )}
          {i < items.length - 1 ? <span className={styles.sep}>{separator}</span> : null}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;


