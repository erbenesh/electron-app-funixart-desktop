import React from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedItem {
  key: string;
  label: React.ReactNode;
}

export interface SegmentedControlProps {
  items: SegmentedItem[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ items, value, onChange, className }) => {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <div
          key={item.key}
          className={[styles.item, item.key === value ? styles.active : undefined].filter(Boolean).join(' ')}
          onClick={() => onChange(item.key)}
          role="button"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};


