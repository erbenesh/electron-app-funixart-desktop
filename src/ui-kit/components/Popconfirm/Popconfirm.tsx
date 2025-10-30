import React, { useState } from 'react';
import styles from './Popconfirm.module.css';

export interface PopconfirmProps {
  title: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: React.ReactElement;
}

export const Popconfirm: React.FC<PopconfirmProps> = ({ title, okText = 'OK', cancelText = 'Cancel', onConfirm, onCancel, children }) => {
  const [open, setOpen] = useState(false);
  const child = React.cloneElement(children, {
    onClick: (e: any) => {
      children.props.onClick?.(e);
      setOpen(o => !o);
    }
  });

  const close = () => setOpen(false);

  return (
    <span className={styles.root}>
      {child}
      {open && (
        <div className={styles.pop} role="dialog" aria-modal="false">
          <div className={styles.title}>{title}</div>
          <div className={styles.actions}>
            <button className={styles.btn} onClick={() => { close(); onCancel?.(); }}>{cancelText}</button>
            <button className={styles.btnPrimary} onClick={() => { close(); onConfirm?.(); }}>{okText}</button>
          </div>
        </div>
      )}
    </span>
  );
};

export default Popconfirm;


