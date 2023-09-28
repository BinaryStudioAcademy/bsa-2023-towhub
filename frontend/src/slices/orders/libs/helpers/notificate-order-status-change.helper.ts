import { type OrderStatusValues } from 'shared/build';

import { notification } from '~/libs/packages/notification/notification.js';

const notificateOrderStatusChange = (status: OrderStatusValues): void => {
  switch (status) {
    case 'confirmed': {
      notification.success('Order Accepted');
      break;
    }
    case 'picking_up': {
      notification.success('Order Confirmed');
      break;
    }
    case 'done': {
      notification.success('Order completed');
      break;
    }
    case 'rejected':
    case 'canceled': {
      notification.warning('Order canceled');
      break;
    }
  }
};

export { notificateOrderStatusChange };
