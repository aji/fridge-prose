import { assert } from './utils.ts';

export class AppTileElement extends HTMLElement {
  x: number;
  y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  static create(phrase: string): AppTileElement {
    const elem = document.createElement('app-tile');
    assert(elem instanceof AppTileElement);
    elem.innerText = phrase;
    return elem;
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

  raiseToTop() {
    this.parentElement?.appendChild(this);
  }
}
