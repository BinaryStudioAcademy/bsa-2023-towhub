const OrdersApiPath = {
  ROOT: '',
  DRIVER_ORDERS: '/driver',
  DRIVER: '/driver/:orderId',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  USER: '/user',
  BUSINESS: '/business',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
