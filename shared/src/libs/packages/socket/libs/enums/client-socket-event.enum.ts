const ClientSocketEvent = {
  CONNECT: 'connect',
  ERROR: 'error',
  DRIVER_TIMED_OUT: 'driver_timed_out',
  SHIFT_ENDED: 'shift_ended',
  SHIFT_SYNC: 'shift_sync',
  TRUCK_AVAILABLE: 'truck_available',
  TRUCK_CHOSEN: 'truck_chosen',
} as const;

export { ClientSocketEvent };
