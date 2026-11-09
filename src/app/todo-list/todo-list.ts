import { Component, inject } from '@angular/core';
import { TodoService, Todo } from '../todo';
import { FavoritesCounterComponent } from '../favorites-counter/favorites-counter';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FavoritesCounterComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);
  protected readonly favorites = inject(FavoritesService);
  filter: 'all' | 'active' | 'done' = 'all';

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'active') return this.todos.filter((todo) => !todo.done);
    if (this.filter === 'done') return this.todos.filter((todo) => todo.done);
    return this.todos;
  }

  addTodo(input: HTMLInputElement): void {
    this.todoService.addTodo(input.value);
    input.value = '';
  }

  removeTodo(id: number): void {
    this.todoService.removeTodo(id);
  }

  toggleDone(id: number): void {
    this.todoService.toggleDone(id);
  }
}