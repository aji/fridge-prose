import './AppBoard.css';
import { AppBoardSelection } from './AppBoardSelection.ts';
import { AppSnapRule } from './AppSnapRule.ts';
import { AppTile } from './AppTile.ts';
import { sample } from './search.ts';
import { SnapResult, combineSnaps, gridSnap, segmentSnap } from './snapping.ts';
import { assert, overlap } from './utils.ts';

//const gridSize = 100;
const snapMargin = 5;
const nudgeBy = 5;

type Serialized = {
  v: 1;
  tiles: [number, number, string][];
};

export class AppBoard extends HTMLElement {
  static name = 'app-board';

  panning: boolean;

  dragTarget: AppTile | null;
  dragOffsetX: number;
  dragOffsetY: number;

  selectionArea: AppBoardSelection | null;
  selectedTiles: AppTile[];

  gridX: number | null;
  gridY: number | null;
  snapRuleX: AppSnapRule | null;
  snapRuleY: AppSnapRule | null;

  constructor() {
    super();

    this.panning = false;

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
    this.addEventListener('dblclick', this.onDblClick.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  static register(): void {
    customElements.define(AppBoard.name, AppBoard);
  }

  saveTo(): string {
    const data: Serialized = { v: 1, tiles: [] };
    for (const child of this.children) {
      if (child instanceof AppTile) {
        data.tiles.push([child.x, child.y, child.innerText]);
      }
    }
    return JSON.stringify(data);
  }

  loadFrom(serialized: string): void {
    const data: Serialized = JSON.parse(serialized);
    this.removeAllTiles();
    for (const [x, y, phrase] of data.tiles) {
      const tile = this.createTile(phrase);
      tile.moveTo(x, y);
    }
  }

  createTile(message: string): AppTile {
    const elem = AppTile.create(message);
    this.appendChild(elem);
    return elem;
  }

  removeAllTiles(): void {
    const toRemove = [];
    for (const child of this.children) {
      if (child instanceof AppTile) {
        toRemove.push(child);
      }
    }
    for (const node of toRemove) {
      node.remove();
    }
  }

  adoptTile(e: MouseEvent): void {
    const elem = e.target;
    assert(elem instanceof AppTile);
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
      if (child instanceof AppTile) {
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

  getSnappable(): DOMRect[] {
    const res: DOMRect[] = [];
    for (const node of this.children) {
      if (
        node instanceof AppTile &&
        !node.isSelected() &&
        node !== this.dragTarget
      ) {
        res.push(node.getBoundingClientRect());
      }
    }
    return res;
  }

  snapX(enabled: boolean, x: number, width: number): SnapResult {
    if (!enabled) return { result: x };
    const grid = this.getGrid();
    const snappable = this.getSnappable();
    return combineSnaps(
      x,
      grid !== null ? gridSnap(x, width, grid.x, snapMargin) : undefined,
      ...snappable.map((r) => segmentSnap(x, width, r.x, r.width, snapMargin))
    );
  }

  snapY(enabled: boolean, y: number, height: number): SnapResult {
    if (!enabled) return { result: y };
    const grid = this.getGrid();
    const snappable = this.getSnappable();
    return combineSnaps(
      y,
      grid !== null ? gridSnap(y, height, grid.y, snapMargin) : undefined,
      ...snappable.map((r) => segmentSnap(y, height, r.y, r.height, snapMargin))
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
    if (this.panning) {
      for (const child of this.children) {
        if (child instanceof AppTile) {
          child.moveBy(e.movementX, e.movementY);
        }
      }
      e.preventDefault();
    } else if (this.dragTarget !== null) {
      const isSelected = this.dragTarget.isSelected();
      if (!isSelected) {
        // need to do this first because it affects snapping
        this.updateSelection(null);
      }

      const snapEnabled = !e.shiftKey;
      const { width, height } = this.dragTarget.getBoundingClientRect();
      const snapX = this.snapX(
        snapEnabled,
        e.clientX + this.dragOffsetX,
        width
      );
      const snapY = this.snapY(
        snapEnabled,
        e.clientY + this.dragOffsetY,
        height
      );
      this.updateSnapRules(snapX.reference ?? null, snapY.reference ?? null);

      if (isSelected) {
        const moveX = snapX.result - this.dragTarget.x;
        const moveY = snapY.result - this.dragTarget.y;
        for (const tile of this.selectedTiles) {
          tile.moveBy(moveX, moveY);
        }
      } else {
        this.dragTarget.moveTo(snapX.result, snapY.result);
      }
    } else if (this.selectionArea !== null) {
      this.selectionArea.endAt(e.clientX, e.clientY);
    }
  }

  onMouseDown(e: MouseEvent): void {
    if ((e.button === 0 && e.ctrlKey) || e.button === 1) {
      this.panning = true;
      this.classList.add('panning');
      e.preventDefault();
    } else if (e.target instanceof AppTile) {
      this.dragTarget = e.target;
      this.dragOffsetX = e.target.x - e.clientX;
      this.dragOffsetY = e.target.y - e.clientY;
      e.target.dragStart();
      e.target.raiseToTop();
      e.preventDefault();
    } else if (e.target === this && this.selectionArea === null) {
      this.selectionArea = AppBoardSelection.create();
      this.appendChild(this.selectionArea);
      this.selectionArea.startAt(e.clientX, e.clientY);
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
      e.preventDefault();
    }
  }

  onDblClick(e: MouseEvent): void {
    const tile = this.createTile(sample());
    const { width, height } = tile.getBoundingClientRect();
    tile.moveTo(e.clientX - width / 2, e.clientY - height / 2);
  }

  onMouseUp(): void {
    if (this.panning) {
      this.panning = false;
      this.classList.remove('panning');
    }
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
    if (e.key === 'g') {
      // disabled until I can get it working with panning
      //this.toggleGrid(gridSize, gridSize);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      this.selectedTiles.forEach((x) => x.remove());
      this.updateSelection(null);
    } else if (e.key === 'ArrowLeft') {
      this.selectedTiles.forEach((x) => x.moveBy(-nudgeBy, 0));
    } else if (e.key === 'ArrowRight') {
      this.selectedTiles.forEach((x) => x.moveBy(nudgeBy, 0));
    } else if (e.key === 'ArrowUp') {
      this.selectedTiles.forEach((x) => x.moveBy(0, -nudgeBy));
    } else if (e.key === 'ArrowDown') {
      this.selectedTiles.forEach((x) => x.moveBy(0, nudgeBy));
    }
  }
}
