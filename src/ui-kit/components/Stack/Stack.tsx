import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export const Stack: React.FC<StackProps> = ({ children, gap = 8, align = 'stretch' }) => (
  <div style={{ display: 'grid', gap, alignItems: align as any }}>{children}</div>
);

export const HStack: React.FC<StackProps> = ({ children, gap = 8, align = 'center' }) => (
  <div style={{ display: 'flex', gap, alignItems: align as any }}>{children}</div>
);

export const VStack: React.FC<StackProps> = ({ children, gap = 8, align = 'stretch' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, alignItems: align as any }}>{children}</div>
);


