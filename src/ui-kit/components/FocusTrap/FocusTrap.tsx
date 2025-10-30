import React, { useEffect, useRef } from 'react';

export const FocusTrap: React.FC<{ enabled?: boolean; children: React.ReactNode }> = ({ enabled, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const focusable = () => el.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const nodes = Array.from(focusable());
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const first = focusable()[0];
    first?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [enabled]);
  return <div ref={ref}>{children}</div>;
};


