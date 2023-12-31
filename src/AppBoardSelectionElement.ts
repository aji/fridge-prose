import { assert } from './utils.ts';

export class AppBoardSelectionElement extends HTMLElement {
  static name = 'app-board-selection';

  constructor() {
    super();
  }

  static register(): void {
    customElements.define(
      AppBoardSelectionElement.name,
      AppBoardSelectionElement
    );
  }

  static create(x: number, y: number): AppBoardSelectionElement {
    const elem = document.createElement(AppBoardSelectionElement.name);
    assert(elem instanceof AppBoardSelectionElement);
    return elem;
  }
}
