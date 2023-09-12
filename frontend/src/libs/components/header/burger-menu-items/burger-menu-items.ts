import { AppRoute, BurgerMenuItemsName, IconName } from '~/libs/enums/enums.js';

const BURGER_MENU_ITEMS = {
  BusinessMenu: [
    {
      name: BurgerMenuItemsName.HISTORY,
      navigateTo: AppRoute.ORDER_HISTORY,
      icon: IconName.CLOCK_ROTATE_LEFT,
    },
    {
      name: BurgerMenuItemsName.EDIT,
      navigateTo: AppRoute.EDIT_PROFILE,
      icon: IconName.USER_PEN,
    },
    {
      name: BurgerMenuItemsName.LOG_OUT,
      navigateTo: AppRoute.SIGN_IN,
      icon: IconName.RIGHT_FROM_BRACKET,
    },
  ],
  CustomerMenu: [
    {
      name: BurgerMenuItemsName.LOG_OUT,
      navigateTo: AppRoute.SIGN_IN,
      icon: IconName.RIGHT_FROM_BRACKET,
    },
  ],
  DriverMenu: [
    {
      name: BurgerMenuItemsName.LOG_OUT,
      navigateTo: AppRoute.SIGN_IN,
      icon: IconName.RIGHT_FROM_BRACKET,
    },
  ],
};

export { BURGER_MENU_ITEMS };
