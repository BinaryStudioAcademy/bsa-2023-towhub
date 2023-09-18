import { OrderStatus } from 'shared/build';
import { type OrderStatusValues } from 'shared/build/packages/orders/libs/types/order-status-values.type';

import { type Color } from '~/libs/types/color.type';

const statusConverter = (
  status: OrderStatusValues,
): { name: string; color: Color } => {
  switch (status) {
    case OrderStatus.PENDING: {
      return { name: 'Pending', color: 'grey-light' };
    }
    case OrderStatus.CONFIRMED: {
      return { name: 'On the way', color: 'blue-light' };
    }
    case OrderStatus.CANCELED: {
      return { name: 'Canceled', color: 'red' };
    }
    case OrderStatus.DONE: {
      return { name: 'Done', color: 'grey-dark' };
    }
    case OrderStatus.PICKING_UP: {
      return { name: 'Arrived', color: 'green' };
    }
    default: {
      return { name: 'Pending', color: 'grey-light' };
    }
  }
};

export { statusConverter };
