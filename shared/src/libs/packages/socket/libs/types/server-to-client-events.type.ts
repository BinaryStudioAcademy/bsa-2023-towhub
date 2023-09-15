import { type OrderUpdateResponseDto } from '~/packages/orders/orders.js';

import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ServerToClientEvents = {
  [ServerSocketEvent.ORDER_UPDATED]: (order: OrderUpdateResponseDto) => void;
};

export { type ServerToClientEvents };
