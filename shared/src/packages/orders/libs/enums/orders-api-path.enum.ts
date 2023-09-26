const OrdersApiPath = {
  ROOT: '',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  DRIVER: '/driver/:orderId',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
