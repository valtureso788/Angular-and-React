import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly favoriteIds = signal<Set<number>>(new Set());

  toggle(id: number): void {
    this.favoriteIds.update((ids) => {
      const nextIds = new Set(ids);
      if (nextIds.has(id)) nextIds.delete(id);
      else nextIds.add(id);
      return nextIds;
    });
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().has(id);
  }

  getCount(): number {
    return this.favoriteIds().size;
  }

  remove(id: number): void {
    this.favoriteIds.update((ids) => {
      const nextIds = new Set(ids);
      nextIds.delete(id);
      return nextIds;
    });
  }
}