const ClientSocketEvent = {
  CONNECT: 'connect',
  JOIN_HOME_ROOM: 'join_home_room',
  LEAVE_HOME_ROOM: 'disconnect_home_room',
} as const;

export { ClientSocketEvent };
