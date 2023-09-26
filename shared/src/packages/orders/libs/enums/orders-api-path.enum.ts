const OrdersApiPath = {
  ROOT: '',
  DRIVER_ORDERS: '/driver',
  DRIVER: '/driver/:orderId',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
