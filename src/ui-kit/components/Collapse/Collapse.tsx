import React, { useState } from 'react';
import styles from './Collapse.module.css';

export interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface CollapseProps {
  items: CollapseItem[];
  defaultActiveKey?: string[];
  accordion?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({ items, defaultActiveKey = [], accordion }) => {
  const [active, setActive] = useState<string[]>(defaultActiveKey);
  const toggle = (key: string) => {
    setActive(prev => {
      const has = prev.includes(key);
      if (accordion) return has ? [] : [key];
      return has ? prev.filter(k => k !== key) : [...prev, key];
    });
  };

  return (
    <div>
      {items.map(it => {
        const open = active.includes(it.key);
        return (
          <div key={it.key} className={styles.item}>
            <div className={styles.header} onClick={() => toggle(it.key)}>{it.label}</div>
            {open ? <div className={styles.content}>{it.children}</div> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Collapse;


