const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  REJECTED: 'rejected',
  DONE: 'done',
  PICKING_UP: 'picking_up',
} as const;

export { OrderStatus };
