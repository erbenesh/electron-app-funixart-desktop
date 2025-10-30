import React from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: string | number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
}

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  gap,
  align,
  justify,
  wrap,
  style,
  children,
  ...rest
}) => {
  const s: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    ...style,
  };
  return (
    <div style={s} {...rest}>
      {children}
    </div>
  );
};


