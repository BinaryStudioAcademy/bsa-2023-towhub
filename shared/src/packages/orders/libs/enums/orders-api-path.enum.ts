const OrdersApiPath = {
  ROOT: '',
  DRIVER: '/driver',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
