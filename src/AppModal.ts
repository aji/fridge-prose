import './AppModal.css';

export class AppModal extends HTMLElement {
  static name = 'app-modal';

  constructor() {
    super();
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.addEventListener('click', this.onClick.bind(this));
  }

  static register() {
    customElements.define(AppModal.name, AppModal);
  }

  show(): void {
    this.classList.remove('hidden');
  }

  hide(): void {
    this.classList.add('hidden');
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target === this) {
      this.hide();
    }
  }

  onClick(e: MouseEvent): void {
    if (e.target instanceof HTMLButtonElement) {
      switch (e.target.getAttribute('data-action')) {
        case 'close':
          this.hide();
          break;
      }
    }
  }
}
