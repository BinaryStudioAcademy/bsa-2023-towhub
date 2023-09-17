const ClientSocketEvent = {
  CONNECT: 'connect',
  SUBSCRIBE_ORDER_UPDATES: 'subscribe_order_updates',
  SUBSCRIBE_TRUCK_UPDATES: 'subscribe_truck_updates',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
} as const;

export { ClientSocketEvent };
