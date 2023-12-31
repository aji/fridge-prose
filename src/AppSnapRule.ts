import { assert } from './utils';
import './AppSnapRule.css';

export class AppSnapRule extends HTMLElement {
  static name = 'app-snap-rule';

  constructor() {
    super();
  }

  static register() {
    customElements.define(AppSnapRule.name, AppSnapRule);
  }

  static create(): AppSnapRule {
    const elem = document.createElement(AppSnapRule.name);
    assert(elem instanceof AppSnapRule);
    return elem;
  }

  update(variant: 'horizontal' | 'vertical', pos: number): void {
    this.className = variant;
    this.style.top = variant === 'horizontal' ? `${pos}px` : '';
    this.style.left = variant === 'vertical' ? `${pos}px` : '';
    console.log(this.getBoundingClientRect());
  }
}
