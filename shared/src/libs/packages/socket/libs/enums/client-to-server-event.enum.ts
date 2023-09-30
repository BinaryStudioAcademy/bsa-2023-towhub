const ClientToServerEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  JOIN_HOME_ROOM: 'join_home_room',
  LEAVE_HOME_ROOM: 'disconnect_home_room',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
  END_SHIFT: 'end_shift',
  START_SHIFT: 'start_shift',
  AUTHORIZE_DRIVER: 'authorize_driver',
  BASE_EVENT: 'base_event',
  SUBSCRIBE_DRIVER_ORDER_CREATED: 'subscribe_driver_order_created',
  SUBSCRIBE_ORDER_UPDATES: 'subscribe_order_updates',
  SUBSCRIBE_TRUCK_UPDATES: 'subscribe_truck_updates',
  UNSUBSCRIBE_ORDER_UPDATES: 'unsubscribe_order_updates',
  UNSUBSCRIBE_TRUCK_UPDATES: 'unsubscribe_truck_updates',
} as const;

export { ClientToServerEvent };
