import { assert } from './utils.ts';
import { AppTileElement } from './AppTileElement.ts';

export class AppBoardElement extends HTMLElement {
  static name = 'app-board';

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

  static register(): void {
    customElements.define(AppBoardElement.name, AppBoardElement);
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
    console.log(e.target);
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
