import React from 'react';

export const useLiveRegion = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    ref.current = el;
    return () => { document.body.removeChild(el); };
  }, []);
  const announce = (msg: string) => { if (ref.current) ref.current.textContent = msg; };
  return { announce };
};


