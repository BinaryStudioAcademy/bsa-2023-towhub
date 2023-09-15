const ClientSocketEvent = {
  CONNECT: 'connect',
  SUBSCRIBE_ORDER_UPDATES: 'subscribe_order_updates',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
} as const;

export { ClientSocketEvent };
