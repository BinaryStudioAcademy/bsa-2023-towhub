import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

type TabsName = 'orders' | 'trucks' | 'drivers';

type TabsType = {
  name: TabsName;
  icon: ValueOf<typeof IconName>;
};

export { type TabsName, type TabsType };
