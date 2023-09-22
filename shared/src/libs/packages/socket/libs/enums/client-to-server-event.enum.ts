const ClientToServerEvent = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DRIVER_LOCATION_UPDATE: 'driver_location_update',
  JOIN_HOME_ROOM: 'join_home_room',
  LEAVE_HOME_ROOM: 'disconnect_home_room',
  TRUCK_LOCATION_UPDATE: 'truck_location_update',
  END_SHIFT: 'end_shift',
  START_SHIFT: 'start_shift',
} as const;

export { ClientToServerEvent };
