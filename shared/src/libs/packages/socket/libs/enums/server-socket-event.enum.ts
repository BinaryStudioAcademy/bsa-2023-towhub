const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  TRUCKS_LIST_UPDATE: 'trucks_list_update',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
} as const;

export { ServerSocketEvent };
