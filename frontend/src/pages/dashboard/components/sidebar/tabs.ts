import { IconName, TabsName } from '~/libs/enums/enums.js';
import { type TabsType } from '~/libs/types/types.js';

const TABS: TabsType[] = [
  {
    name: TabsName.ORDERS,
    icon: IconName.LIST,
    path: 'dashboard',
  },
  {
    name: TabsName.TRUCKS,
    icon: IconName.TRUCK,
    path: 'dashboard/trucks',
  },
  {
    name: TabsName.DRIVERS,
    icon: IconName.USERS,
    path: 'dashboard/drivers',
  },
];

export { TABS };
