import { type OrderStatusValues } from 'shared/build';

import { OrderStatus } from '~/libs/enums/enums.js';
import { notification } from '~/libs/packages/notification/notification.js';

const notificateOrderStatusChange = (status: OrderStatusValues): void => {
  switch (status) {
    case OrderStatus.CONFIRMED: {
      notification.success('Order Accepted');
      break;
    }
    case OrderStatus.PICKING_UP: {
      notification.success('Order Confirmed');
      break;
    }
    case OrderStatus.DONE: {
      notification.success('Order completed');
      break;
    }
    case OrderStatus.REJECTED:
    case OrderStatus.CANCELED: {
      notification.warning('Order canceled');
      break;
    }
  }
};

export { notificateOrderStatusChange };
