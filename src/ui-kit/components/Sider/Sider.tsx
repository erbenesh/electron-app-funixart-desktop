import React from 'react';
import styles from './Sider.module.css';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  collapsedWidth?: string;
  collapsed?: boolean;
}

export const Sider: React.FC<SiderProps> = ({
  width = '16rem',
  collapsedWidth = '4rem',
  collapsed,
  className,
  children,
  ...rest
}) => {
  const style: React.CSSProperties = { width: collapsed ? collapsedWidth : width };
  const cls = [styles.sider, className].filter(Boolean).join(' ');
  return (
    <aside className={cls} style={style} {...rest}>
      {children}
    </aside>
  );
};


