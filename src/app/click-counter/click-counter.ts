import { Component } from '@angular/core';

@Component({
  selector: 'app-click-counter',
  standalone: true,
  imports: [],
  templateUrl: './click-counter.html',
  styleUrl: './click-counter.css',
})
export class ClickCounterComponent {
  count = 0;

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }
}