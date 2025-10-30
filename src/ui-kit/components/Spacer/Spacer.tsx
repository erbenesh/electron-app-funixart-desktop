import React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg';

const sizeToRem: Record<Size, string> = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
};

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'sm', horizontal, style, ...rest }) => {
  const computedStyle = horizontal
    ? { width: sizeToRem[size], height: 0, ...style }
    : { height: sizeToRem[size], width: 0, ...style };

  return <div style={computedStyle} aria-hidden {...rest} />;
};


