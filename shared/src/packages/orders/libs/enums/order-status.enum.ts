const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  PICKING_UP: 'picking_up',
  DONE: 'done',
  PICKING_UP: 'picking_up',
} as const;

export { OrderStatus };
