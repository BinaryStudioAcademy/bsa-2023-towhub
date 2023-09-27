import { type AppRoute, type SidebarTabsName } from '~/libs/enums/enums.js';
import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

type TabsType = {
  name: ValueOf<typeof SidebarTabsName>;
  path: ValueOf<typeof AppRoute>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof SidebarTabsName>;

export { type TabName, type TabsType };
