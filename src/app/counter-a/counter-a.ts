import { Component, inject } from '@angular/core';
import { CounterService } from '../counter';

@Component({
  selector: 'app-counter-a',
  standalone: true,
  imports: [],
  templateUrl: './counter-a.html',
  styleUrl: './counter-a.css',
})
export class CounterAComponent {
  protected readonly counter = inject(CounterService);
}