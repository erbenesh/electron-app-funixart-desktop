import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
}

const sizeMap = {
  sm: 'var(--text-sm, 0.875rem)',
  md: 'var(--text-md, 1rem)',
  lg: 'var(--text-lg, 1.125rem)'
};

export const Text: React.FC<TextProps> = ({ size = 'md', muted, style, children, ...rest }) => {
  const s: React.CSSProperties = {
    fontSize: sizeMap[size],
    color: muted ? 'var(--color-text-muted, rgba(255,255,255,0.6))' : undefined,
    ...style
  };
  return (
    <span style={s} {...rest}>
      {children}
    </span>
  );
};


