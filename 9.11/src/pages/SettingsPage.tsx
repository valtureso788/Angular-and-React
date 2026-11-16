import { useQueryClient } from '@tanstack/react-query';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { clearFavorites } = useFavorites();
  const queryClient = useQueryClient();
  function resetData() {
    if (!window.confirm('Сбросить тему, избранное и кэш задач?')) return;
    clearFavorites();
    localStorage.removeItem('favorites-v1');
    localStorage.removeItem('tracker-theme');
    document.documentElement.dataset.theme = 'light';
    queryClient.clear();
    window.location.reload();
  }
  return (
    <section>
      <p className="eyebrow">ПЕРСОНАЛИЗАЦИЯ</p><h1>Настройки</h1>
      <div className="panel setting-row"><div><h2>Тема оформления</h2><p>Текущая тема: {theme === 'light' ? 'светлая' : 'тёмная'}</p></div><button onClick={toggleTheme}>Переключить тему</button></div>
      <div className="panel setting-row"><div><h2>Сбросить данные</h2><p>Очистить избранное, тему и кэш приложения.</p></div><button className="danger-button" onClick={resetData}>Сбросить всё</button></div>
      <EmptyState title="Ваши настройки сохраняются локально" hint="Избранное и тема останутся после перезагрузки страницы." />
    </section>
  );
}
