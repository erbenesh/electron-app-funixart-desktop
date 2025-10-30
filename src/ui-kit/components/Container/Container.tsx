import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({ className, children, ...rest }) => {
  const classNames = [styles.container, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};


