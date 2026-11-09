import { Component, inject } from '@angular/core';
import { CounterService } from '../counter';

@Component({
  selector: 'app-counter-b',
  standalone: true,
  imports: [],
  templateUrl: './counter-b.html',
  styleUrl: './counter-b.css',
})
export class CounterBComponent {
  protected readonly counter = inject(CounterService);
}