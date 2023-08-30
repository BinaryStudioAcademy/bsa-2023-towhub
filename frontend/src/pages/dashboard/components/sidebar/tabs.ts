import { IconName, TabsName } from '~/libs/enums/enums.js';
import { type TabsType } from '~/libs/types/types.js';

const TABS: TabsType[] = [
  {
    name: TabsName.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: TabsName.TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: TabsName.DRIVERS,
    icon: IconName.USERS,
  },
];

export { TABS };
