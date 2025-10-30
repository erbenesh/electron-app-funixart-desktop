import React, { useState } from 'react';
import styles from './Tooltip.module.css';
import { useFloating, offset, flip, shift, arrow, FloatingPortal } from '@floating-ui/react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({ placement: 'top', middleware: [offset(8), flip(), shift()] });
  return (
    <span ref={refs.setReference} className={styles.wrapper} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} className={styles.bubble} role="tooltip">{content}</div>
        </FloatingPortal>
      )}
    </span>
  );
};


