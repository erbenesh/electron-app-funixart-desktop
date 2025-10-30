import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import './theme/tokens.css';
import anixartBrandTokens from './theme/brands/anixart';

export type Theme = 'dark' | 'light';

type BrandTokens = Record<string, string>; // CSS variable overrides: {'--color-accent': '#ff5500'}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setBrandTokens: (tokens: BrandTokens) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

interface ThemeProviderProps {
  initialTheme?: Theme;
  initialBrandTokens?: BrandTokens;
  storageKey?: string;
  children: React.ReactNode;
}

// Persist + system preference
function getInitialTheme(storageKey: string, initial?: Theme): Theme {
  try {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  if (initial) return initial;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme,
  initialBrandTokens,
  storageKey = 'ui-theme',
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => (typeof window === 'undefined' ? 'dark' : getInitialTheme(storageKey, initialTheme)));
  const [brandTokens, setBrandTokens] = useState<BrandTokens>(initialBrandTokens || anixartBrandTokens);

  useEffect(() => {
    try { localStorage.setItem(storageKey, theme); } catch {}
  }, [theme, storageKey]);

  // Apply theme class to body (or root container)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('theme-light'); else root.classList.remove('theme-light');
  }, [theme]);

  const styleVars = useMemo<React.CSSProperties>(() => {
    // Accept plain names (without --) as well
    const entries = Object.entries(brandTokens).map(([k, v]) => [k.startsWith('--') ? k : `--${k}`, v]);
    return Object.fromEntries(entries) as React.CSSProperties;
  }, [brandTokens]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setTheme: (t) => setThemeState(t),
    toggleTheme: () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    setBrandTokens: (t) => setBrandTokens((prev) => ({ ...prev, ...t })),
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', ...styleVars }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};


