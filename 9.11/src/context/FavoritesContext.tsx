import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextValue {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites-v1', []);
  function toggleFavorite(id: number) {
    setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }
  function isFavorite(id: number) {
    return favorites.includes(id);
  }
  function clearFavorites() {
    setFavorites([]);
  }
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (context === null) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
