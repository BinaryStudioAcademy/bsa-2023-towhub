const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  ORDER_UPDATED: 'order_updated',
} as const;

export { ServerSocketEvent };
