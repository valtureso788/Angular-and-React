import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the practice exercises', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Интерактивная лаборатория');
    expect(compiled.querySelector('app-todo-list')).toBeTruthy();
    expect(compiled.querySelector('app-click-counter')).toBeTruthy();
    expect(compiled.querySelector('app-shopping-list')).toBeTruthy();
    expect(compiled.querySelector('app-counter-a')).toBeTruthy();
    expect(compiled.querySelector('app-counter-b')).toBeTruthy();
    expect(compiled.querySelector('app-add-to-cart')).toBeTruthy();
    expect(compiled.querySelector('app-cart-view')).toBeTruthy();
  });
});
