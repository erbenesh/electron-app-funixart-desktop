import React from 'react';

export const RatingCompact: React.FC<{ value?: number; precision?: number }>
  = ({ value, precision = 1 }) => {
  const v = value != null ? Number(value).toFixed(precision) : '—';
  return <span>★ {v}</span>;
};


