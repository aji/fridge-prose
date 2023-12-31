import { AppBoardElement } from './AppBoardElement.ts';
import { AppDrawerElement } from './AppDrawerElement.ts';
import { AppDrawerOptionsElement } from './AppDrawerOptionsElement.ts';
import { AppTileElement } from './AppTileElement.ts';

customElements.define('app-board', AppBoardElement);
customElements.define('app-tile', AppTileElement);
customElements.define('app-drawer', AppDrawerElement);
customElements.define('app-drawer-options', AppDrawerOptionsElement);
