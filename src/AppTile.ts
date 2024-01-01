import { assert } from './utils.ts';
import './AppTile.css';

export class AppTile extends HTMLElement {
  static name = 'app-tile';

  x: number;
  y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  static register(): void {
    customElements.define(AppTile.name, AppTile);
  }

  static create(phrase: string): AppTile {
    const elem = document.createElement(AppTile.name);
    assert(elem instanceof AppTile);
    elem.innerText = phrase;
    return elem;
  }

  setIsSelected(selected: boolean): void {
    if (selected) this.setAttribute('data-selected', 'true');
    else this.removeAttribute('data-selected');
  }

  isSelected(): boolean {
    return this.getAttribute('data-selected') === 'true';
  }

  dragStart() {
    this.style.cursor = 'grabbing';
  }

  dragEnd() {
    this.style.cursor = 'grab';
  }

  moveTo(x: number, y: number) {
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    this.x = x;
    this.y = y;
  }

  moveBy(dx: number, dy: number) {
    this.moveTo(this.x + dx, this.y + dy);
  }

  raiseToTop() {
    this.parentElement?.appendChild(this);
  }
}
