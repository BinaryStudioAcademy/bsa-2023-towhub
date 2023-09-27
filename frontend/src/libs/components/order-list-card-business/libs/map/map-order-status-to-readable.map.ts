import { OrderStatus } from '~/libs/enums/enums.js';
import { type OrderStatusValues } from '~/libs/types/types.js';

import { type ReadableStatusWithColor } from '../types/readable-status-with-color.type.js';

const mapOrderStatusToReadable: Record<
  OrderStatusValues,
  ReadableStatusWithColor
> = {
  [OrderStatus.PENDING]: { name: 'Pending', color: 'grey-light' },
  [OrderStatus.CONFIRMED]: { name: 'On the way', color: 'blue-light' },
  [OrderStatus.CANCELED]: { name: 'Canceled', color: 'red' },
  [OrderStatus.DONE]: { name: 'Done', color: 'grey-dark' },
  [OrderStatus.PICKING_UP]: { name: 'Arrived', color: 'green' },
  [OrderStatus.REJECTED]: { name: 'Rejected', color: 'red-light' },
};

export { mapOrderStatusToReadable };
