const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  REFUSED: 'refused',
  DONE: 'done',
} as const;

export { OrderStatus };
