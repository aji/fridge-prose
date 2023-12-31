import { AppDrawerElement } from './AppDrawerElement.ts';
import { AppTileElement } from './AppTileElement.ts';
import { assert, para } from './utils.ts';

const maxOptions = 50;

export class AppDrawerOptionsElement extends HTMLElement {
  static name = 'app-drawer-options';

  constructor() {
    super();
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.style.display = 'none';
  }

  static register(): void {
    customElements.define(
      AppDrawerOptionsElement.name,
      AppDrawerOptionsElement
    );
  }

  open(): void {
    this.style.display = '';
    this.innerHTML = '';
    this.appendChild(para('Options will appear here.'));
  }

  close(): void {
    this.style.display = 'none';
    this.innerHTML = '';
  }

  setOptions(options: string[]): void {
    this.innerHTML = '';
    for (let i = 0; i < maxOptions && i < options.length; i++) {
      this.appendChild(AppTileElement.create(options[i]));
    }
    if (options.length > maxOptions) {
      const extra = options.length - maxOptions;
      const counter = extra === 1 ? 'additional option' : 'additional options';
      this.appendChild(para(`Plus ${extra} ${counter}`));
    }
    if (options.length === 0) {
      this.appendChild(para('No results'));
    }
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target instanceof AppTileElement) {
      assert(this.parentElement instanceof AppDrawerElement);
      this.parentElement.adoptTile(e);
      e.preventDefault();
    }
  }
}
