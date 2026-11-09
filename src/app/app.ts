import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card';
import { TodoListComponent } from './todo-list/todo-list';
import { ClickCounterComponent } from './click-counter/click-counter';
import { ShoppingListComponent } from './shopping-list/shopping-list';
import { CounterAComponent } from './counter-a/counter-a';
import { CounterBComponent } from './counter-b/counter-b';
import { AddToCartComponent } from './add-to-cart/add-to-cart';
import { CartViewComponent } from './cart-view/cart-view';

@Component({
  selector: 'app-root',
  imports: [
    ProductCardComponent,
    TodoListComponent,
    ClickCounterComponent,
    ShoppingListComponent,
    CounterAComponent,
    CounterBComponent,
    AddToCartComponent,
    CartViewComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
