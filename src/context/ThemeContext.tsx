'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '@/theme';

type ColorScheme = 'light' | 'dark';
type ThemeColorKeys = 'background' | 'text' | 'primary' | 'success' | 'error' | 'warning';

interface ThemeContextType {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
  getColor: (key: ThemeColorKeys) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => {
    const color = colorScheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('colorScheme', color);
    setColorScheme(color);
  };

  function getColor(key: ThemeColorKeys) {
    const theme = colorScheme === 'light' ? lightTheme : darkTheme;
    return theme.colors?.[key]?.[0] ?? '#000000';
  }

  useEffect(() => {
    const color = localStorage.getItem('colorScheme') as ColorScheme;

    if (color) {
      setColorScheme(color);
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme, getColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
