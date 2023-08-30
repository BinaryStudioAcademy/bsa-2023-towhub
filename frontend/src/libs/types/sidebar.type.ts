import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type TabsName } from '../enums/sidebar-tabs.enum.js';

type TabsType = {
  name: ValueOf<typeof TabsName>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof TabsName>;

export { type TabName, type TabsType };
