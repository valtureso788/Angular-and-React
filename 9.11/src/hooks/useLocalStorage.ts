import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved) as T;
    } catch (error) {
      console.warn(`Не удалось прочитать localStorage "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Не удалось сохранить localStorage "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
