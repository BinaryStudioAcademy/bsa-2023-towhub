import { OrderStatus } from '../enums/order-status.enum.js';

const ORDER_STATUSES = Object.values(OrderStatus as Record<number, string>) as [
  string,
  ...string[],
];

export { ORDER_STATUSES };
