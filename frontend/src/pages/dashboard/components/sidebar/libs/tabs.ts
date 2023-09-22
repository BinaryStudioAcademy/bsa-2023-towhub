import {
  IconName,
  SidebarTabsName,
  SidebarTabsPath,
} from '~/libs/enums/enums.js';
import { type TabsType } from '~/libs/types/types.js';

const BUSINESS_TABS: TabsType[] = [
  {
    name: SidebarTabsName.ORDERS,
    path: SidebarTabsPath.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: SidebarTabsName.TRUCKS,
    path: SidebarTabsPath.TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: SidebarTabsName.DRIVERS,
    path: SidebarTabsPath.DRIVERS,
    icon: IconName.USERS,
  },
];

const DRIVER_TABS: TabsType[] = [
  {
    name: SidebarTabsName.ORDERS,
    path: SidebarTabsPath.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: SidebarTabsName.TRUCK,
    path: SidebarTabsPath.CHOOSE_TRUCK,
    icon: IconName.TRUCK,
  },
  {
    name: SidebarTabsName.PROFILE,
    path: SidebarTabsPath.PROFILE,
    icon: IconName.USER_PEN,
  },
];

export { BUSINESS_TABS, DRIVER_TABS };
