import { type OrderStatusValues } from './order-status-values.type.js';

type OrderQueryParameters = {
  status: OrderStatusValues | 'all';
  size: number;
  page: number;
};

export { type OrderQueryParameters };
