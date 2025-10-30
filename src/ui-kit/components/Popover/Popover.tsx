import React, { useRef, useState } from 'react';
import styles from './Popover.module.css';

export interface PopoverProps {
  content: React.ReactNode;
  title?: React.ReactNode;
  trigger?: 'hover' | 'click';
  children: React.ReactElement;
}

export const Popover: React.FC<PopoverProps> = ({ content, title, trigger = 'hover', children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const child = React.cloneElement(children, {
    onClick: (e: any) => {
      children.props.onClick?.(e);
      if (trigger === 'click') setOpen(o => !o);
    },
    onMouseEnter: (e: any) => {
      children.props.onMouseEnter?.(e);
      if (trigger === 'hover') setOpen(true);
    },
    onMouseLeave: (e: any) => {
      children.props.onMouseLeave?.(e);
      if (trigger === 'hover') setOpen(false);
    }
  });

  return (
    <span ref={ref} className={styles.root}>
      {child}
      {open && (
        <div className={styles.pop} role="tooltip">
          {title ? <div className={styles.title}>{title}</div> : null}
          <div className={styles.content}>{content}</div>
        </div>
      )}
    </span>
  );
};

export default Popover;


