import { type ValueOf } from '~/libs/types/value-of.type.js';

import { OrderStatus } from '../enums/order-status.enum.js';

const ORDER_STATUSES = Object.values(OrderStatus) as [
  ValueOf<typeof OrderStatus>,
];

export { ORDER_STATUSES };
