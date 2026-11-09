import { Component, inject } from '@angular/core';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-favorites-counter',
  standalone: true,
  imports: [],
  templateUrl: './favorites-counter.html',
  styleUrl: './favorites-counter.css',
})
export class FavoritesCounterComponent {
  private readonly favorites = inject(FavoritesService);

  get count(): number {
    return this.favorites.getCount();
  }
}