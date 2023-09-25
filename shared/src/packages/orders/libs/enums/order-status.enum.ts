const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  REJECTED: 'rejected',
  PICKING_UP: 'picking_up',
  DONE: 'done',
} as const;

export { OrderStatus };
