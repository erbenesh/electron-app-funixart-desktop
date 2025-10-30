import React from 'react';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: React.FC<TitleProps> = ({ level = 2, children, style, ...rest }) => {
  const Tag = (`h${level}` as any);
  const s: React.CSSProperties = { margin: 0, ...style };
  return (
    <Tag style={s} {...(rest as any)}>
      {children}
    </Tag>
  );
};


