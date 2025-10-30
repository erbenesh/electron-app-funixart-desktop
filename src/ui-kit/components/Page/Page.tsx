import React from 'react';
import styles from './Page.module.css';

type TopOffset = 'none' | 'sm' | 'md';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  topOffset?: TopOffset;
}

export const Page: React.FC<PageProps> = ({ topOffset = 'none', className, children, ...rest }) => {
  const classNames = [
    styles.page,
    topOffset !== 'none' ? styles[`top_${topOffset}`] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};


