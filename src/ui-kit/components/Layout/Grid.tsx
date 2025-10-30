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

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number;
}

export const Row: React.FC<RowProps> = ({ gutter = 16, style, className, children, ...rest }) => {
  const s: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -gutter / 2,
    marginRight: -gutter / 2,
    rowGap: gutter,
    ...style,
  };
  return (
    <div className={className} style={s} {...rest}>
      {children}
    </div>
  );
};

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number; // 1..24 default
  offset?: number;
  gutter?: number; // to compute padding outside Row
  xs?: number; sm?: number; md?: number; lg?: number; xl?: number; // responsive spans
}

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

export const Col: React.FC<ColProps> = ({ span = 24, offset = 0, gutter = 16, xs, sm, md, lg, xl, style, className, children, ...rest }) => {
  const getSpan = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
    if (w >= breakpoints.xl && xl) return xl;
    if (w >= breakpoints.lg && lg) return lg;
    if (w >= breakpoints.md && md) return md;
    if (w >= breakpoints.sm && sm) return sm;
    if (xs) return xs;
    return span;
  };

  const [currSpan, setCurrSpan] = React.useState(getSpan());
  React.useEffect(() => {
    const onResize = () => setCurrSpan(getSpan());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xs, sm, md, lg, xl, span]);

  const width = `${(currSpan / 24) * 100}%`;
  const marginLeft = offset ? `${(offset / 24) * 100}%` : undefined;
  const s: React.CSSProperties = {
    boxSizing: 'border-box',
    paddingLeft: gutter / 2,
    paddingRight: gutter / 2,
    width,
    marginLeft,
    ...style,
  };
  return (
    <div className={className} style={s} {...rest}>
      {children}
    </div>
  );
};
