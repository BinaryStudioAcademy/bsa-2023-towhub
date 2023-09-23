import { OrderStatus } from '~/libs/enums/enums.js';
import { type Color } from '~/libs/types/color.type';
import { type OrderStatusValues } from '~/libs/types/types.js';

const statusMapper = new Map<OrderStatusValues, { name: string; color: Color }>(
  [
    [OrderStatus.PENDING, { name: 'Pending', color: 'grey-light' }],
    [OrderStatus.CONFIRMED, { name: 'On the way', color: 'blue-light' }],
    [OrderStatus.CANCELED, { name: 'Canceled', color: 'red' }],
    [OrderStatus.DONE, { name: 'Done', color: 'grey-dark' }],
    [OrderStatus.PICKING_UP, { name: 'Arrived', color: 'green' }],
  ],
);

export { statusMapper };
