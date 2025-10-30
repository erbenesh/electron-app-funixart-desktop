import React from 'react';
import { BottomSheet, BottomSheetProps } from '../BottomSheet/BottomSheet';
import styles from './ActionSheet.module.css';

export interface ActionItem {
  key: string;
  label: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface ActionSheetProps extends Omit<BottomSheetProps, 'children'> {
  actions: ActionItem[];
  cancelText?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ actions, cancelText = 'Отмена', ...rest }) => {
  return (
    <BottomSheet {...rest}>
      <div className={styles.list}>
        {actions.map(a => (
          <button key={a.key} className={`${styles.item} ${a.danger ? styles.danger : ''}`} onClick={a.onClick}>{a.label}</button>
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.cancel} onClick={rest.onClose}>{cancelText}</button>
      </div>
    </BottomSheet>
  );
};


