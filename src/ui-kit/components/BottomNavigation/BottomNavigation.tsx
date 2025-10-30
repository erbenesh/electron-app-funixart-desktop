import React from 'react';
import styles from './BottomNavigation.module.css';
import { NavLink } from 'react-router-dom';

export interface BottomNavItem {
  key: string;
  to: string;
  icon: React.ReactNode;
  label?: string;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, className }) => {
  return (
    <nav className={[styles.root, className].filter(Boolean).join(' ')}>
      {items.map((it) => (
        <NavLink key={it.key} to={it.to} className={({ isActive }) => isActive ? styles.itemActive : styles.item}>
          <span className={styles.icon}>{it.icon}</span>
          {it.label && <span className={styles.label}>{it.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
};


