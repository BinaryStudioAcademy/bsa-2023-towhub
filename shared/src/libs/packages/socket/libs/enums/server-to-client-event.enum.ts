const ServerToClientEvent = {
  CONNECT: 'connect',
  ERROR: 'error',
  DRIVER_TIMED_OUT: 'driver_timed_out',
  SHIFT_ENDED: 'shift_ended',
  SHIFT_SYNC: 'shift_sync',
  TRUCK_AVAILABLE: 'truck_available',
  TRUCK_CHOSEN: 'truck_chosen',
  TRUCKS_LIST_UPDATE: 'trucks_list_update',
  BASE_EVENT: 'base_event',
} as const;

export { ServerToClientEvent };
