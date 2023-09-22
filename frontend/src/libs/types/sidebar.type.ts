import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type SidebarTabsName } from '../enums/sidebar-tabs-name.enum.js';
import { type SidebarTabsPath } from '../enums/sidebar-tabs-path.enum.js';

type TabsType = {
  name: ValueOf<typeof SidebarTabsName>;
  path: ValueOf<typeof SidebarTabsPath>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof SidebarTabsName>;

export { type TabName, type TabsType };
