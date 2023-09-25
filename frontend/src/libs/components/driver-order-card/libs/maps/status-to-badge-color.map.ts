import { type ValueOf } from 'shared/build/index.js';

import { type Color } from '~/libs/components/badge/libs/types/color.type.js';

import { OrderStatus } from '../enums/enums.js';

const BLUE = 'blue-extra-light';
const GREEN = 'green-extra-light';
const RED = 'red-extra-light';

const statusToBadgeColorMap: Record<ValueOf<typeof OrderStatus>, Color> = {
  [OrderStatus.DONE]: GREEN,
  [OrderStatus.CANCELED]: RED,
  [OrderStatus.PENDING]: BLUE,
  [OrderStatus.PICKING_UP]: BLUE,
  [OrderStatus.CONFIRMED]: BLUE,
};

export { statusToBadgeColorMap };
