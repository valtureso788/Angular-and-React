import { Component, inject } from '@angular/core';
import { CartItem, CartService } from '../cart';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.css',
})
export class CartViewComponent {
  private readonly cart = inject(CartService);

  get items(): CartItem[] {
    return this.cart.getItems();
  }

  get total(): number {
    return this.cart.getTotal();
  }

  removeItem(id: number): void {
    this.cart.removeItem(id);
  }

  clear(): void {
    this.cart.clear();
  }
}