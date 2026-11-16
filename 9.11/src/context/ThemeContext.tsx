import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Theme = 'light' | 'dark';
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): Theme {
  try {
    return localStorage.getItem('tracker-theme') === '"dark"' ? 'dark' : 'light';
  } catch (error) {
    console.warn('Не удалось прочитать тему', error);
    return 'light';
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('tracker-theme', readTheme());
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const value = { theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light') };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
