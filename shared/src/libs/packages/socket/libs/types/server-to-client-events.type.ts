import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ServerToClientEvents = {
  [ServerSocketEvent.ORDER_UPDATED]: () => void;
};

export { type ServerToClientEvents };
