import { AppBoard } from './AppBoard.ts';
import { AppBoardSelection } from './AppBoardSelection.ts';
import { AppDrawer } from './AppDrawer.ts';
import { AppDrawerOptionsElement } from './AppDrawerOptions.ts';
import { AppMenu } from './AppMenu.ts';
import { AppModal } from './AppModal.ts';
import { AppSnapRule } from './AppSnapRule.ts';
import { AppTile } from './AppTile.ts';
import './index.css';
import { assert } from './utils.ts';

AppBoard.register();
AppBoardSelection.register();
AppDrawer.register();
AppDrawerOptionsElement.register();
AppSnapRule.register();
AppTile.register();
AppMenu.register();
AppModal.register();

const board = document.getElementById('board');
assert(board !== null && board instanceof AppBoard);

const about = document.getElementById('about');
assert(about !== null && about instanceof AppModal);

const storageKey = 'fridgeProse';

let saveTimer: number | undefined = undefined;
const saveDriver = new MutationObserver(() => {
  window.clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(storageKey, board.saveTo());
  }, 100);
});
saveDriver.observe(board, { subtree: true, childList: true, attributes: true });

const toLoad = localStorage.getItem(storageKey);
if (toLoad === null) {
  about.show();
} else {
  about.hide();
  board.loadFrom(toLoad);
}
