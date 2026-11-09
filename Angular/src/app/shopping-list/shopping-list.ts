import { Component } from '@angular/core';

interface ShoppingItem {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingListComponent {
  items: ShoppingItem[] = [
    { id: 1, name: 'Молоко', done: false },
    { id: 2, name: 'Яблоки', done: true },
  ];
  private nextId = 3;

  get completedCount(): number {
    return this.items.filter((item) => item.done).length;
  }

  addItem(input: HTMLInputElement): void {
    const name = input.value.trim();
    if (!name) return;

    this.items = [...this.items, { id: this.nextId++, name, done: false }];
    input.value = '';
  }

  toggleItem(id: number): void {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}