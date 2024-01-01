import { AppBoard } from './AppBoard.ts';
import { AppBoardSelection } from './AppBoardSelection.ts';
import { AppDrawer } from './AppDrawer.ts';
import { AppDrawerOptionsElement } from './AppDrawerOptions.ts';
import { AppMenu } from './AppMenu.ts';
import { AppModal } from './AppModal.ts';
import { AppSnapRule } from './AppSnapRule.ts';
import { AppTile } from './AppTile.ts';
import './index.css';

AppBoard.register();
AppBoardSelection.register();
AppDrawer.register();
AppDrawerOptionsElement.register();
AppSnapRule.register();
AppTile.register();
AppMenu.register();
AppModal.register();
