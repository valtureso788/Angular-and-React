import { NavLink, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { favorites, clearFavorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">Taskspace</NavLink>
        <nav>
          <NavLink to="/" end>Обзор</NavLink>
          <NavLink to="/tasks">Задачи</NavLink>
          <NavLink to="/settings">Настройки</NavLink>
        </nav>
        <div className="header-actions">
          <span>⭐ {favorites.length}</span>
          {favorites.length > 0 && <button onClick={clearFavorites}>Очистить избранное</button>}
          <button onClick={toggleTheme}>{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</button>
        </div>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer>Локальные настройки хранятся в этом браузере · Данные задач загружаются из JSONPlaceholder</footer>
    </div>
  );
}
