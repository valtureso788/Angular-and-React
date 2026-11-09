import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<CartItem[]>([]);
  private nextId = 1;

  getItems(): CartItem[] {
    return this.items().map((item) => ({ ...item }));
  }

  addItem(name: string, price: number): void {
    const trimmedName = name.trim();
    if (!trimmedName || !Number.isFinite(price) || price < 0) return;

    this.items.update((items) => {
      const existing = items.find(
        (item) => item.name.toLocaleLowerCase() === trimmedName.toLocaleLowerCase(),
      );
      if (existing) {
        return items.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { id: this.nextId++, name: trimmedName, price, quantity: 1 }];
    });
  }

  removeItem(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  getTotal(): number {
    return this.items().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clear(): void {
    this.items.set([]);
  }
}