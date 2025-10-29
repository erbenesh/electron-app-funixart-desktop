import React from 'react';
import styles from './Card.module.css';

type Padding = 'sm' | 'md' | 'lg' | 'none';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: Padding;
}

export const Card: React.FC<CardProps> = ({ padding = 'md', className, children, ...rest }) => {
  const classNames = [
    styles.card,
    padding !== 'none' ? styles[`padding-${padding}`] : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};


