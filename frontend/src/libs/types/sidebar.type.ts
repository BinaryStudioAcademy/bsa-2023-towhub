import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type TabNames } from '../enums/sidebar-tabs.enum.js';

type TabsType = {
  name: ValueOf<typeof TabNames>;
  icon: ValueOf<typeof IconName>;
};

type TabName = ValueOf<typeof TabNames>;

export { type TabName, type TabsType };
