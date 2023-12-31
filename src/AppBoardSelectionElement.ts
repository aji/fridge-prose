import { assert } from './utils.ts';
import './AppBoardSelectionElement.css';

export class AppBoardSelectionElement extends HTMLElement {
  static name = 'app-board-selection';

  x: number;
  y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  static register(): void {
    customElements.define(
      AppBoardSelectionElement.name,
      AppBoardSelectionElement
    );
  }

  static create(): AppBoardSelectionElement {
    const elem = document.createElement(AppBoardSelectionElement.name);
    assert(elem instanceof AppBoardSelectionElement);
    return elem;
  }

  startAt(x: number, y: number): void {
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    this.style.width = '1px';
    this.style.height = '1px';
    this.x = x;
    this.y = y;
  }

  endAt(x: number, y: number): void {
    let dx = Math.abs(x - this.x);
    let dy = Math.abs(y - this.y);
    let x0 = Math.min(x, this.x);
    let y0 = Math.min(y, this.y);
    this.style.left = `${x0}px`;
    this.style.top = `${y0}px`;
    this.style.width = `${dx}px`;
    this.style.height = `${dy}px`;
  }
}
