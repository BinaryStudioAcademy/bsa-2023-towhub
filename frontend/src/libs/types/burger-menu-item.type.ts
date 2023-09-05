import { type BurgerMenuItemsName, type IconName } from '../enums/enums.js';
import { type ValueOf } from './types.js';

type BurgerMenuItem = {
  name: ValueOf<typeof BurgerMenuItemsName>;
  onClick: () => void;
  icon: ValueOf<typeof IconName>;
};

export { type BurgerMenuItem };
