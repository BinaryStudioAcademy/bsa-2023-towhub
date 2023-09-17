const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ORDER_UPDATED: 'order_updated',
  TRUCK_LOCATION_UPDATED: 'truck_location_updated',
} as const;

export { ServerSocketEvent };
