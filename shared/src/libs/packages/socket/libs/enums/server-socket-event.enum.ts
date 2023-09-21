const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  TRUCKS_LIST_UPDATE: 'trucks_list_update',
  ORDER_UPDATED: 'order_updated',
  TRUCK_LOCATION_UPDATED: 'truck_location_updated',
} as const;

export { ServerSocketEvent };
