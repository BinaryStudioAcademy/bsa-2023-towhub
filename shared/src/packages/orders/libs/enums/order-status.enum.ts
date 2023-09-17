const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  REFUSED: 'refused',
  DONE: 'done',
  PICKING_UP: 'picking_up',
} as const;

export { OrderStatus };
