const ClientSocketEvent = {
  CONNECT: 'connect',
  JOIN_HOME_ROOM: 'join_home_room',
  LEAVE_HOME_ROOM: 'disconnect_home_room',
  SUBSCRIBE_ORDER_UPDATES: 'subscribe_order_updates',
  SUBSCRIBE_TRUCK_UPDATES: 'subscribe_truck_updates',
  UNSUBSCRIBE_ORDER_UPDATES: 'unsubscribe_order_updates',
  UNSUBSCRIBE_TRUCK_UPDATES: 'unsubscribe_truck_updates',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
} as const;

export { ClientSocketEvent };
