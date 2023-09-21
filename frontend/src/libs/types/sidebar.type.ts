import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type TabsPath } from '../enums/sidebar-path.enum.js';
import { type TabsName } from '../enums/sidebar-tabs.enum.js';

type TabsType = {
  name: ValueOf<typeof TabsName>;
  path: ValueOf<typeof TabsPath>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof TabsName>;

export { type TabName, type TabsType };
