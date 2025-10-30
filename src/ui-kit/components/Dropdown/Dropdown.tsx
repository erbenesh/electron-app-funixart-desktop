import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import { Menu, MenuProps } from '../Menu/Menu';
import Portal from '../Portal/Portal';

export interface DropdownProps {
  menu: MenuProps;
  trigger?: 'click' | 'hover';
  children: React.ReactElement;
}

export const Dropdown: React.FC<DropdownProps> = ({ menu, trigger = 'click', children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc); };
  }, [open]);

  const child = React.cloneElement(children, {
    onClick: (e: any) => {
      children.props.onClick?.(e);
      if (trigger === 'click') setOpen(o => !o);
    },
    onMouseEnter: (e: any) => { children.props.onMouseEnter?.(e); if (trigger === 'hover') setOpen(true); },
    onMouseLeave: (e: any) => { children.props.onMouseLeave?.(e); if (trigger === 'hover') setOpen(false); },
  });

  const [placement, setPlacement] = useState<'bottom-left' | 'top-left' | 'bottom-right' | 'top-right'>('bottom-left');
  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth; const vh = window.innerHeight;
    const preferBottom = rect.bottom + 200 < vh;
    const preferLeft = rect.left + 200 < vw;
    setPlacement(`${preferBottom ? 'bottom' : 'top'}-${preferLeft ? 'left' : 'right'}` as any);
  }, [open]);

  const coords = (() => {
    if (!ref.current) return { top: 0, left: 0 };
    const r = ref.current.getBoundingClientRect();
    const sx = window.scrollX || document.documentElement.scrollLeft;
    const sy = window.scrollY || document.documentElement.scrollTop;
    let top = r.bottom + sy + 6; let left = r.left + sx;
    if (placement.startsWith('top')) top = r.top + sy - 6;
    if (placement.endsWith('right')) left = r.right + sx;
    return { top, left };
  })();

  return (
    <span ref={ref} className={styles.root}>
      {child}
      {open && (
        <Portal>
          <div className={styles.portalOverlay} style={{ position: 'absolute', top: coords.top, left: coords.left }}>
            <div className={[styles.overlay, styles[placement]].join(' ')} onMouseLeave={() => trigger==='hover' && setOpen(false)}>
              <div className={styles.arrow} />
              <Menu {...menu} />
            </div>
          </div>
        </Portal>
      )}
    </span>
  );
};

export default Dropdown;


