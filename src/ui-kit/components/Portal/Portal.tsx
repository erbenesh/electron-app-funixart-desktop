import React from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  container?: Element | null;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ container, children }) => {
  const [el] = React.useState(() => document.createElement('div'));
  React.useEffect(() => {
    const root = container || document.body;
    root.appendChild(el);
    return () => { try { root.removeChild(el); } catch {} };
  }, [container, el]);
  return createPortal(children, el);
};

export default Portal;


