import React, { useEffect, useRef, useState } from 'react';
import styles from './Popover.module.css';
import Portal from '../Portal/Portal';

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

  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');
  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    setPlacement(rect.bottom + 160 < vh ? 'bottom' : 'top');
  }, [open]);

  const coords = (() => {
    if (!ref.current) return { top: 0, left: 0 };
    const r = ref.current.getBoundingClientRect();
    const sx = window.scrollX || document.documentElement.scrollLeft;
    const sy = window.scrollY || document.documentElement.scrollTop;
    return { top: placement === 'bottom' ? r.bottom + sy + 6 : r.top + sy - 6, left: r.left + sx };
  })();

  return (
    <span ref={ref} className={styles.root}>
      {child}
      {open && (
        <Portal>
          <div className={styles.portal} style={{ position: 'absolute', top: coords.top, left: coords.left }}>
            <div className={styles.pop} role="tooltip">
              <div className={styles.arrow} />
              {title ? <div className={styles.title}>{title}</div> : null}
              <div className={styles.content}>{content}</div>
            </div>
          </div>
        </Portal>
      )}
    </span>
  );
};

export default Popover;


