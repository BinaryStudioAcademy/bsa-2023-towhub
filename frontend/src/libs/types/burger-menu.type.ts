import { type IconProp } from '@fortawesome/fontawesome-svg-core';

import { type MenuLable } from '../enums/enums.js';
import { type ValueOf } from './types.js';

type MenuItem = {
  label: ValueOf<typeof MenuLable>;
  onClick: () => void;
  icon: IconProp;
};

export { type MenuItem };
