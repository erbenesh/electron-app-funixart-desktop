import React from 'react';
import styles from './Menu.module.css';

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
}

export const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <ul className={styles.menu} role="menu">
      {items.map(i => (
        <li
          key={i.key}
          role="menuitem"
          className={[styles.item, i.danger ? styles.danger : undefined, i.disabled ? styles.disabled : undefined].filter(Boolean).join(' ')}
          onClick={() => !i.disabled && i.onClick?.()}
        >
          {i.label}
        </li>
      ))}
    </ul>
  );
};

export default Menu;


