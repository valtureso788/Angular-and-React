import { inject, Injectable, signal } from '@angular/core';
import { FavoritesService } from './favorites';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly favorites = inject(FavoritesService);
  private readonly todos = signal<Todo[]>([
    { id: 1, text: 'Изучить Angular', done: false },
    { id: 2, text: 'Сделать проект', done: true },
  ]);
  private nextId = 3;

  getTodos(): Todo[] {
    return [...this.todos()];
  }

  addTodo(text: string): void {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    this.todos.update((todos) => [...todos, { id: this.nextId++, text: trimmedText, done: false }]);
  }

  toggleDone(id: number): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.favorites.remove(id);
  }
}