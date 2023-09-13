import { type BurgerMenuItem } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { BURGER_MENU_ITEMS } from '../constants/constants.js';

const getBurgerMenuItems = (group: string | null): BurgerMenuItem[] => {
  switch (group) {
    case UserGroupKey.BUSINESS: {
      return BURGER_MENU_ITEMS.businessMenu;
    }
    case UserGroupKey.DRIVER: {
      return BURGER_MENU_ITEMS.driverMenu;
    }
    default: {
      return BURGER_MENU_ITEMS.customerMenu;
    }
  }
};

export { getBurgerMenuItems };
