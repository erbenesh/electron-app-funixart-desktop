import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultActiveKey, onChange }) => {
  const [activeKey, setActiveKey] = useState<string>(defaultActiveKey ?? items[0]?.key);

  const handleClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const active = items.find(i => i.key === activeKey) ?? items[0];

  return (
    <div className={styles.tabs}>
      <div className={styles.list}>
        {items.map(i => (
          <div
            key={i.key}
            className={[styles.tab, i.key === activeKey ? styles.active : undefined].filter(Boolean).join(' ')}
            onClick={() => handleClick(i.key)}
            role="tab"
          >
            {i.label}
          </div>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel">
        {active?.content}
      </div>
    </div>
  );
};


