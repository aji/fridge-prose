import { search } from './search.ts';
import { assert } from './utils.ts';

function para(text: string): HTMLParagraphElement {
  const p = document.createElement('p');
  p.innerText = text;
  return p;
}

class AppBoardElement extends HTMLElement {
  dragTarget: AppTileElement | null;
  dragOffsetX: number;
  dragOffsetY: number;

  constructor() {
    super();

    this.dragTarget = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  createTile(message: string): AppTileElement {
    const elem = AppTileElement.create(message);
    this.appendChild(elem);
    return elem;
  }

  adoptTile(e: MouseEvent): void {
    const elem = e.target;
    assert(elem instanceof AppTileElement);
    const { left, top } = elem.getBoundingClientRect();
    this.dragTarget = elem;
    this.dragOffsetX = left - e.clientX;
    this.dragOffsetY = top - e.clientY;
    this.appendChild(elem);
    elem.moveTo(left, top);
    elem.dragStart();
  }

  arrangeTiles(): void {
    const gap = 5;
    const { width } = this.getBoundingClientRect();

    let curX = gap;
    let curY = gap;
    let colSize = 0;

    for (const node of this.children) {
      if (!(node instanceof AppTileElement)) {
        continue;
      }

      const rect = node.getBoundingClientRect();

      if (width < curX + rect.width) {
        curX = gap;
        curY = curY + colSize + gap;
        colSize = 0;
      }

      node.moveTo(curX, curY);
      curX += rect.width + gap;
      colSize = Math.max(colSize, rect.height);
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (this.dragTarget !== null) {
      this.dragTarget.moveTo(
        e.clientX + this.dragOffsetX,
        e.clientY + this.dragOffsetY
      );
    }
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target instanceof AppTileElement) {
      this.dragTarget = e.target;
      this.dragOffsetX = e.target.x - e.clientX;
      this.dragOffsetY = e.target.y - e.clientY;
      e.target.dragStart();
      e.target.raiseToTop();
      e.preventDefault();
    }
  }

  onMouseUp(): void {
    this.dragTarget?.dragEnd();
    this.dragTarget = null;
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'r') {
      this.arrangeTiles();
    }
  }
}

class AppTileElement extends HTMLElement {
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

class AppDrawerElement extends HTMLElement {
  board: AppBoardElement | undefined;
  options: HTMLElement;
  input: HTMLInputElement;

  constructor() {
    super();

    this.input = document.createElement('input');
    this.appendChild(this.input);
    this.input.addEventListener('focus', this.onInputFocus.bind(this));
    this.input.addEventListener('blur', this.onInputBlur.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));

    this.options = document.createElement('app-drawer-options');
    this.appendChild(this.options);

    const boardAttr = this.getAttribute('board');
    if (boardAttr) {
      this.boardChanged(boardAttr);
    }

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  boardChanged(next: string) {
    const elem = document.getElementById(next);
    assert(elem !== null && elem instanceof AppBoardElement);
    this.board = elem;
  }

  adoptTile(e: MouseEvent) {
    assert(this.board !== undefined);
    this.board.adoptTile(e);
    this.endInput();
  }

  attributeChangedCallback(name: string, _prev: string, next: string) {
    switch (name) {
      case 'board': {
        this.boardChanged(next);
        break;
      }
    }
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
    if (e.key === '/' && e.target !== this.input) {
      e.preventDefault();
      this.startInput();
    }
    if (e.key === 'Escape' && e.target === this.input) {
      this.endInput();
    }
  }

  onInput(e: Event): void {
    if (e.target === this.input) {
      this.onInputChanged(this.input.value);
    }
  }
}

const maxOptions = 50;

class AppDrawerOptionsElement extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.style.display = 'none';
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
  }

  onMouseDown(e: MouseEvent): void {
    if (e.target instanceof AppTileElement) {
      assert(this.parentElement instanceof AppDrawerElement);
      this.parentElement.adoptTile(e);
      e.preventDefault();
    }
  }
}

customElements.define('app-board', AppBoardElement);
customElements.define('app-tile', AppTileElement);
customElements.define('app-drawer', AppDrawerElement);
customElements.define('app-drawer-options', AppDrawerOptionsElement);
