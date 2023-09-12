import { IconName, TabsName } from '~/libs/enums/enums.js';
import { type TabsType } from '~/libs/types/types.js';

const TABS: TabsType[] = [
  {
    name: TabsName.ORDERS,
    icon: IconName.LIST,
    path: '',
  },
  {
    name: TabsName.TRUCKS,
    icon: IconName.TRUCK,
    path: 'trucks',
  },
  {
    name: TabsName.DRIVERS,
    icon: IconName.USERS,
    path: 'drivers',
  },
];

export { TABS };
