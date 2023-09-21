import { IconName, TabsName } from '~/libs/enums/enums.js';
import { TabsPath } from '~/libs/enums/sidebar-path.enum';
import { type TabsType } from '~/libs/types/types.js';

const BUSINESS_TABS: TabsType[] = [
  {
    name: TabsName.ORDERS,
    path: TabsPath.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: TabsName.TRUCKS,
    path: TabsPath.TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: TabsName.DRIVERS,
    path: TabsPath.DRIVERS,
    icon: IconName.USERS,
  },
];

const DRIVER_TABS: TabsType[] = [
  {
    name: TabsName.ORDERS,
    path: TabsPath.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: TabsName.TRUCK,
    path: TabsPath.CHOOSE_TRUCK,
    icon: IconName.TRUCK,
  },
  {
    name: TabsName.PROFILE,
    path: TabsPath.PROFILE,
    icon: IconName.USER_PEN,
  },
];

export { BUSINESS_TABS, DRIVER_TABS };
