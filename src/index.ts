import { AppBoardElement } from './AppBoardElement.ts';
import { AppBoardSelectionElement } from './AppBoardSelectionElement.ts';
import { AppDrawerElement } from './AppDrawerElement.ts';
import { AppDrawerOptionsElement } from './AppDrawerOptionsElement.ts';
import { AppSnapRule } from './AppSnapRule.ts';
import { AppTileElement } from './AppTileElement.ts';
import { AppModalElement } from './AppModalElement.ts';
import './index.css';
import { AppMenu } from './AppMenu.ts';

AppBoardElement.register();
AppBoardSelectionElement.register();
AppDrawerElement.register();
AppDrawerOptionsElement.register();
AppSnapRule.register();
AppTileElement.register();
AppMenu.register();
AppModalElement.register();
