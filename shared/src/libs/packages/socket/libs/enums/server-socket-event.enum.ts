const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  END_SHIFT: 'end_shift',
  CHOOSE_TRUCK: 'choose_truck',
} as const;

export { ServerSocketEvent };
