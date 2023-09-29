import { OrderStatus } from '~/libs/enums/enums.js';
import { type OrderStatusValues } from '~/libs/types/types.js';

import { BadgeStatusColor, ProgressStatus } from '../enums/enums.js';
import { type BadgeStatus } from '../types/badge-status.type.js';

const mapOrderStatusToBadgeStatus: Record<OrderStatusValues, BadgeStatus> = {
  [OrderStatus.PENDING]: {
    badgeBg: BadgeStatusColor.BLUE,
    progress: ProgressStatus.IN_PROCESS,
  },
  [OrderStatus.CONFIRMED]: {
    badgeBg: BadgeStatusColor.BLUE,
    progress: ProgressStatus.IN_PROCESS,
  },
  [OrderStatus.CANCELED]: {
    badgeBg: BadgeStatusColor.RED,
    progress: ProgressStatus.CANCELED,
  },
  [OrderStatus.DONE]: {
    badgeBg: BadgeStatusColor.GREEN,
    progress: ProgressStatus.DONE,
  },
  [OrderStatus.PICKING_UP]: {
    badgeBg: BadgeStatusColor.BLUE,
    progress: ProgressStatus.IN_PROCESS,
  },
  [OrderStatus.REJECTED]: {
    badgeBg: BadgeStatusColor.RED,
    progress: ProgressStatus.CANCELED,
  },
};

export { mapOrderStatusToBadgeStatus };
