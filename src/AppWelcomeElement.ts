import './AppWelcomeElement.css';

export class AppWelcomeElement extends HTMLElement {
  static name = 'app-welcome';

  constructor() {
    super();
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  static register() {
    customElements.define(AppWelcomeElement.name, AppWelcomeElement);
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target === this) {
      this.style.display = 'none';
    }
  }
}
