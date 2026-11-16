import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
function readTheme() {
  try {
    return localStorage.getItem('context-theme') === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.warn('Не удалось прочитать тему', error);
    return 'light';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('context-theme', theme);
    } catch (error) {
      console.warn('Не удалось сохранить тему', error);
    }
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
