const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  PICKING_UP: 'picking_up',
  DONE: 'done',
} as const;

export { OrderStatus };
