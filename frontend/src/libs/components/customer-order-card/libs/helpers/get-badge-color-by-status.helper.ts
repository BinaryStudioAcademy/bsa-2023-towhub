import { OrderStatus } from '~/packages/orders/orders.js';

import { ProgressStatus } from '../enums/progress-status.js';
import { type BadgeStatus } from '../types/badge-status.type.js';

const getBadgeColorByStatus = (status: string): BadgeStatus => {
  switch (status) {
    case OrderStatus.DONE: {
      return { badgeBg: 'green-extra-light', progress: ProgressStatus.DONE };
    }
    case OrderStatus.CANCELED: {
      return { badgeBg: 'red-extra-light', progress: ProgressStatus.CANCELED };
    }
    default: {
      return {
        badgeBg: 'blue-extra-light',
        progress: ProgressStatus.IN_PROCESS,
      };
    }
  }
};

export { getBadgeColorByStatus };
