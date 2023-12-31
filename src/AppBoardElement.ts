import { assert, overlap } from './utils.ts';
import { AppTileElement } from './AppTileElement.ts';
import './AppBoardElement.css';
import { AppBoardSelectionElement } from './AppBoardSelectionElement.ts';

export class AppBoardElement extends HTMLElement {
  static name = 'app-board';

  dragTarget: AppTileElement | null;
  dragOffsetX: number;
  dragOffsetY: number;

  selectionArea: AppBoardSelectionElement | null;
  selectedTiles: AppTileElement[];

  constructor() {
    super();

    this.dragTarget = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.selectionArea = null;
    this.selectedTiles = [];

    this.addEventListener('mousedown', this.onMouseDown.bind(this));
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

  updateSelection(rect: DOMRect | null): void {
    this.selectedTiles = [];
    for (const child of this.children) {
      if (child instanceof AppTileElement) {
        const selected =
          rect !== null && overlap(rect, child.getBoundingClientRect());
        child.setIsSelected(selected);
        if (selected) this.selectedTiles.push(child);
      }
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (this.dragTarget !== null) {
      const moveX = e.clientX + this.dragOffsetX - this.dragTarget.x;
      const moveY = e.clientY + this.dragOffsetY - this.dragTarget.y;
      if (this.dragTarget.isSelected()) {
        for (const tile of this.selectedTiles) {
          tile.moveBy(moveX, moveY);
        }
      } else {
        this.updateSelection(null);
        this.dragTarget.moveBy(moveX, moveY);
      }
    }
    if (this.selectionArea !== null) {
      this.selectionArea.endAt(e.clientX, e.clientY);
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
    if (e.target === this && this.selectionArea === null) {
      this.selectionArea = AppBoardSelectionElement.create();
      this.appendChild(this.selectionArea);
      this.selectionArea.startAt(e.clientX, e.clientY);
      e.preventDefault();
    }
  }

  onMouseUp(): void {
    if (this.dragTarget !== null) {
      this.dragTarget.dragEnd();
      this.dragTarget = null;
    }
    if (this.selectionArea !== null) {
      this.updateSelection(this.selectionArea.getBoundingClientRect());
      this.removeChild(this.selectionArea);
      this.selectionArea = null;
    }
  }
}
