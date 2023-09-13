const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  END_SHIFT: 'end_shift',
  START_SHIFT: 'start_shift',
} as const;

export { ServerSocketEvent };
