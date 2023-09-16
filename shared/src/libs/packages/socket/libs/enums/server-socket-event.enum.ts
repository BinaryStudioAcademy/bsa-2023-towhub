const ServerSocketEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
  END_SHIFT: 'end_shift',
  START_SHIFT: 'start_shift',
} as const;

export { ServerSocketEvent };
