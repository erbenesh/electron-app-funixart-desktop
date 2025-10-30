import React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  minColWidth?: string;
  gap?: string | number;
}

export const Grid: React.FC<GridProps> = ({ minColWidth = '16rem', gap = '0.5rem', style, children, ...rest }) => {
  const s: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`,
    gap,
    ...style,
  };
  return (
    <div style={s} {...rest}>
      {children}
    </div>
  );
};


