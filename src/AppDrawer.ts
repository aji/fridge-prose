import { AppBoard } from './AppBoard.ts';
import { AppDrawerOptionsElement } from './AppDrawerOptions.ts';
import { search } from './search.ts';
import { assert, expected } from './utils.ts';
import './AppDrawer.css';

export class AppDrawer extends HTMLElement {
  static name = 'app-drawer';

  options: HTMLElement;
  input: HTMLInputElement;

  constructor() {
    super();

    this.input = document.createElement('input');
    this.appendChild(this.input);
    this.input.addEventListener('focus', this.onInputFocus.bind(this));
    this.input.addEventListener('blur', this.onInputBlur.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));
    this.input.addEventListener('keydown', this.onInputKeydown.bind(this));

    this.options = document.createElement('app-drawer-options');
    this.appendChild(this.options);

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  static register(): void {
    customElements.define(AppDrawer.name, AppDrawer);
  }

  board(): AppBoard {
    const board = expected(this.getAttribute('board'));
    const elem = expected(document.getElementById(board));
    assert(elem instanceof AppBoard);
    return elem;
  }

  adoptTile(e: MouseEvent) {
    assert(this.board !== undefined);
    this.board().adoptTile(e);
    this.endInput();
  }

  startInput(): void {
    this.input.focus();
    this.input.select();
    this.onInputStart();
  }

  endInput(): void {
    this.input.blur();
    this.onInputEnd();
  }

  onInputStart(): void {
    assert(this.options instanceof AppDrawerOptionsElement);
    this.options.open();
    this.onInputChanged(this.input.value ?? '');
  }

  onInputChanged(q: string): void {
    assert(this.options instanceof AppDrawerOptionsElement);
    this.options.setOptions(search(q));
  }

  onInputEnd(): void {
    assert(this.options instanceof AppDrawerOptionsElement);
    this.options.close();
  }

  onInputFocus(): void {
    this.onInputStart();
  }

  onInputBlur(): void {
    this.onInputEnd();
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === '/') {
      e.preventDefault();
      this.startInput();
    }
  }

  onInputKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.endInput();
    }
    e.stopPropagation();
  }

  onInput(e: Event): void {
    if (e.target === this.input) {
      this.onInputChanged(this.input.value);
    }
  }
}
