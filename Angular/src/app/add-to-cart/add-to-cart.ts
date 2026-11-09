import { Component, inject } from '@angular/core';
import { CartService } from '../cart';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css',
})
export class AddToCartComponent {
  private readonly cart = inject(CartService);

  addItem(nameInput: HTMLInputElement, priceInput: HTMLInputElement): void {
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    if (!name || priceInput.value === '' || !Number.isFinite(price) || price < 0) return;

    this.cart.addItem(name, price);
    nameInput.value = '';
    priceInput.value = '';
  }
}