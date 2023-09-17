import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ServerToClientEvents = {
  [ServerSocketEvent.ORDER_UPDATED]: (order: OrderResponseDto) => void;
  [ServerSocketEvent.TRUCK_LOCATION_UPDATED]: (payload: {
    truckId: number;
    latLng: {
      latitude: number;
      longitude: number;
    };
  }) => void;
};

export { type ServerToClientEvents };
