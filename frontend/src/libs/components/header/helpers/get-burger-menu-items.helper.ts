import { type BurgerMenuItem } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { BURGER_MENU_ITEMS } from '../burger-menu-items/burger-menu-items.js';

const getBurgerMenuItems = (group: string): BurgerMenuItem[] | null => {
  switch (group) {
    case UserGroupKey.BUSINESS: {
      return BURGER_MENU_ITEMS.BusinessMenu;
    }
    case UserGroupKey.CUSTOMER: {
      return BURGER_MENU_ITEMS.CustomerMenu;
    }
    case UserGroupKey.DRIVER: {
      return BURGER_MENU_ITEMS.DriverMenu;
    }
    default: {
      return null;
    }
  }
};

export { getBurgerMenuItems };
