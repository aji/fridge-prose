import './AppBoardElement.css';
import { AppBoardSelectionElement } from './AppBoardSelectionElement.ts';
import { AppSnapRule } from './AppSnapRule.ts';
import { AppTileElement } from './AppTileElement.ts';
import { SnapResult, combineSnaps, gridSnap } from './snapping.ts';
import { assert, overlap } from './utils.ts';

export class AppBoardElement extends HTMLElement {
  static name = 'app-board';

  dragTarget: AppTileElement | null;
  dragOffsetX: number;
  dragOffsetY: number;

  selectionArea: AppBoardSelectionElement | null;
  selectedTiles: AppTileElement[];

  gridX: number | null;
  gridY: number | null;
  snapRuleX: AppSnapRule | null;
  snapRuleY: AppSnapRule | null;

  constructor() {
    super();

    this.dragTarget = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.selectionArea = null;
    this.selectedTiles = [];

    this.gridX = null;
    this.gridY = null;
    this.snapRuleX = null;
    this.snapRuleY = null;

    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
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

  setGrid(x: number, y: number): void {
    this.style.backgroundSize = `${x}px ${y}px`;
    this.classList.add('grid');
    this.gridX = x;
    this.gridY = y;
  }

  clearGrid(): void {
    this.style.backgroundSize = '';
    this.classList.remove('grid');
    this.gridX = null;
    this.gridY = null;
  }

  getGrid(): { x: number; y: number } | null {
    return this.gridX !== null && this.gridY !== null
      ? { x: this.gridX, y: this.gridY }
      : null;
  }

  hasGrid(): boolean {
    return this.gridX !== null && this.gridY !== null;
  }

  toggleGrid(x: number, y: number): void {
    if (this.hasGrid()) this.clearGrid();
    else this.setGrid(x, y);
  }

  snapX(x: number, width: number): SnapResult {
    const grid = this.getGrid();
    return combineSnaps(
      x,
      grid !== null ? gridSnap(x, width, grid.x, 5) : undefined
    );
  }

  snapY(y: number, height: number): SnapResult {
    const grid = this.getGrid();
    return combineSnaps(
      y,
      grid !== null ? gridSnap(y, height, grid.x, 5) : undefined
    );
  }

  updateSnapRules(x: number | null, y: number | null): void {
    if (x !== null) {
      if (this.snapRuleX === null) {
        this.snapRuleX = AppSnapRule.create();
        this.appendChild(this.snapRuleX);
      }
      this.snapRuleX.update('vertical', x);
    } else {
      if (this.snapRuleX !== null) {
        this.removeChild(this.snapRuleX);
        this.snapRuleX = null;
      }
    }

    if (y !== null) {
      if (this.snapRuleY === null) {
        this.snapRuleY = AppSnapRule.create();
        this.appendChild(this.snapRuleY);
      }
      this.snapRuleY.update('horizontal', y);
    } else {
      if (this.snapRuleY !== null) {
        this.removeChild(this.snapRuleY);
        this.snapRuleY = null;
      }
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (this.dragTarget !== null) {
      const { width, height } = this.dragTarget.getBoundingClientRect();
      const snapX = this.snapX(e.clientX + this.dragOffsetX, width);
      const snapY = this.snapY(e.clientY + this.dragOffsetY, height);
      this.updateSnapRules(snapX.reference ?? null, snapY.reference ?? null);
      if (this.dragTarget.isSelected()) {
        const moveX = snapX.result - this.dragTarget.x;
        const moveY = snapY.result - this.dragTarget.y;
        for (const tile of this.selectedTiles) {
          tile.moveBy(moveX, moveY);
        }
      } else {
        this.updateSelection(null);
        this.dragTarget.moveTo(snapX.result, snapY.result);
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
      this.updateSnapRules(null, null);
    }
    if (this.selectionArea !== null) {
      this.updateSelection(this.selectionArea.getBoundingClientRect());
      this.removeChild(this.selectionArea);
      this.selectionArea = null;
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    console.log(e);
    if (e.key === 'g') {
      this.toggleGrid(100, 100);
    }
  }
}
