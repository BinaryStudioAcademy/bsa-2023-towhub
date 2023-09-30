import { type ValueOf } from 'shared/build/index.js';

import { type Color } from '~/libs/components/badge/libs/types/color.type.js';

import { OrderStatus, StatusColors } from '../enums/enums.js';

const statusToBadgeColorMap: Record<ValueOf<typeof OrderStatus>, Color> = {
  [OrderStatus.DONE]: StatusColors.GREEN,
  [OrderStatus.CANCELED]: StatusColors.RED,
  [OrderStatus.REJECTED]: StatusColors.RED,
  [OrderStatus.PENDING]: StatusColors.BLUE,
  [OrderStatus.PICKING_UP]: StatusColors.BLUE,
  [OrderStatus.CONFIRMED]: StatusColors.BLUE,
};

export { statusToBadgeColorMap };
