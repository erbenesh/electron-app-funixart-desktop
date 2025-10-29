import React from 'react';
import './theme/tokens.css';

export type Theme = 'dark' | 'light' | undefined;

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = 'dark', children }) => {
  const className = theme === 'light' ? 'theme-light' : undefined;
  return (
    <div className={className} style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {children}
    </div>
  );
};


