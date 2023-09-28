import { type OrderStatusValues } from './order-status-values.type.js';

type OrderQueryParameters = {
  status?: OrderStatusValues;
  size: number;
  page: number;
};

export { type OrderQueryParameters };
