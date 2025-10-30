import React, { useRef, useState } from 'react';
import styles from './Popover.module.css';
import { useFloating, offset, flip, shift, FloatingPortal } from '@floating-ui/react';

export interface PopoverProps {
  content: React.ReactNode;
  title?: React.ReactNode;
  trigger?: 'hover' | 'click';
  children: React.ReactElement;
}

export const Popover: React.FC<PopoverProps> = ({ content, title, trigger = 'hover', children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const { refs, floatingStyles } = useFloating({ placement: 'bottom-start', middleware: [offset(6), flip(), shift()] });

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

  React.useEffect(() => { refs.setReference(ref.current); }, [refs]);

  return (
    <span ref={ref} className={styles.root}>
      {child}
      {open && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} className={styles.pop} role="tooltip">
            {title ? <div className={styles.title}>{title}</div> : null}
            <div className={styles.content}>{content}</div>
          </div>
        </FloatingPortal>
      )}
    </span>
  );
};

export default Popover;


