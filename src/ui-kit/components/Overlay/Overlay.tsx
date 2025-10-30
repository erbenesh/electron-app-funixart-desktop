import React from 'react';
import Portal from '../Portal/Portal';

export interface OverlayProps {
  open: boolean;
  onClick?: () => void;
  zIndex?: number;
}

export const Overlay: React.FC<OverlayProps> = ({ open, onClick, zIndex = 1000 }) => {
  if (!open) return null;
  return (
    <Portal>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex }} onClick={onClick} />
    </Portal>
  );
};

export default Overlay;


