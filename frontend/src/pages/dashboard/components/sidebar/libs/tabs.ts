import { AppRoute, IconName, SidebarTabsName } from '~/libs/enums/enums.js';
import { type TabsType } from '~/libs/types/types.js';

const BUSINESS_TABS: TabsType[] = [
  {
    name: SidebarTabsName.ORDERS,
    path: AppRoute.DASHBOARD_ORDERS,
    icon: IconName.LIST,
  },
  {
    name: SidebarTabsName.TRUCKS,
    path: AppRoute.DASHBOARD_TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: SidebarTabsName.DRIVERS,
    path: AppRoute.DASHBOARD_DRIVERS,
    icon: IconName.USERS,
  },
  {
    name: SidebarTabsName.PAYMENTS,
    path: AppRoute.DASHBOARD_PAYMENTS,
    icon: IconName.PAYMENTS,
  },
];

const DRIVER_TABS: TabsType[] = [
  {
    name: SidebarTabsName.ORDERS,
    path: AppRoute.ORDERS,
    icon: IconName.LIST,
  },
  {
    name: SidebarTabsName.TRUCK,
    path: AppRoute.AVAILABLE_TRUCKS,
    icon: IconName.TRUCK,
  },
  {
    name: SidebarTabsName.PROFILE,
    path: AppRoute.EDIT_PROFILE,
    icon: IconName.USER_PEN,
  },
];

export { BUSINESS_TABS, DRIVER_TABS };
