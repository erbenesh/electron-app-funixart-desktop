import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import { Menu, MenuProps } from '../Menu/Menu';
import { useFloating, offset, flip, shift, FloatingPortal } from '@floating-ui/react';

export interface DropdownProps {
  menu: MenuProps;
  trigger?: 'click' | 'hover';
  children: React.ReactElement;
}

export const Dropdown: React.FC<DropdownProps> = ({ menu, trigger = 'click', children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const { refs, floatingStyles } = useFloating({ placement: 'bottom-start', middleware: [offset(6), flip(), shift()] });

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

  useEffect(() => { refs.setReference(ref.current); }, [refs]);

  return (
    <span ref={ref} className={styles.root}>
      {child}
      {open && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} className={styles.overlay} onMouseLeave={() => trigger==='hover' && setOpen(false)}>
            <Menu {...menu} />
          </div>
        </FloatingPortal>
      )}
    </span>
  );
};

export default Dropdown;


