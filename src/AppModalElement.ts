import './AppModalElement.css';

export class AppModalElement extends HTMLElement {
  static name = 'app-modal';

  constructor() {
    super();
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  static register() {
    customElements.define(AppModalElement.name, AppModalElement);
  }

  show(): void {
    this.style.display = '';
  }

  hide(): void {
    this.style.display = 'none';
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target === this) {
      this.hide();
    }
  }
}
