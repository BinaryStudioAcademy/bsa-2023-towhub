const OrdersApiPath = {
  ROOT: '',
  DRIVER_ORDERS: '/driver',
  DRIVER: '/driver/:orderId',
  CALCULATE_PRICE: '/calculate-price',
  $ID: '/:id',
  BUSINESS: '/business',
  CUSTOMER: '/customer/:orderId',
} as const;

export { OrdersApiPath };
