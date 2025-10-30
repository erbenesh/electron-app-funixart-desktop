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
  separatorIcon?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/', separatorIcon, maxItems }) => {
  const collapsedItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) return items;
    return [items[0], { title: '...' } as BreadcrumbItem, items[items.length - 1]];
  }, [items, maxItems]);
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      {collapsedItems.map((item, i) => (
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
          {i < collapsedItems.length - 1 ? <span className={styles.sep}>{separatorIcon ?? separator}</span> : null}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;


