const OrdersApiPath = {
  ROOT: '',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  USER: '/user',
  DRIVER: '/driver/:orderId',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
