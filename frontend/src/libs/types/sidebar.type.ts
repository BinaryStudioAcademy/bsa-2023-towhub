import {
  type SidebarTabsName,
  type SidebarTabsPath,
} from '~/libs/enums/enums.js';
import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

type TabsType = {
  name: ValueOf<typeof SidebarTabsName>;
  path: ValueOf<typeof SidebarTabsPath>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof SidebarTabsName>;

export { type TabName, type TabsType };
