import './AppMenu.css';
import { AppModalElement } from './AppModalElement.ts';
import { assert, expected } from './utils.ts';

export class AppMenu extends HTMLElement {
  static name = 'app-menu';

  constructor() {
    super();
    this.addEventListener('click', this.onClick.bind(this));
  }

  static register(): void {
    customElements.define(AppMenu.name, AppMenu);
  }

  onClick(e: MouseEvent): void {
    if (e.target instanceof HTMLElement) {
      switch (e.target.getAttribute('data-action')) {
        case 'modal': {
          const targetID = expected(e.target.getAttribute('data-target'));
          const target = expected(document.getElementById(targetID));
          assert(target instanceof AppModalElement);
          target.show();
        }
      }
    }
  }
}
