const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
} as const;

export { ServerSocketEvent };
