import { Component } from '@angular/core';

interface Product {
  name: string;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  product: Product = {
    name: 'Ноутбук',
    price: 75000,
    description: 'Мощный и легкий',
  };

  getProductInfo(): string {
    return `${this.product.name} стоит ${this.product.price} руб.`;
  }
}
