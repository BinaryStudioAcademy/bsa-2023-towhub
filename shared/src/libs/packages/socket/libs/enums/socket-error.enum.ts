const SocketError = {
  TRUCK_BUSY: 'Truck is already busy',
  TRUCK_ACTIVE: 'Truck is already active',
  TRUCK_NOT_AVAILABLE: 'Truck is not available',
  TRUCK_DOES_NOT_EXIST: 'Truck does not exist',
  NOT_AUTHORIZED: 'You are not authorized',
  SHIFT_ENDED: 'Shift is already ended',
} as const;

export { SocketError };
