import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ServerToClientEvents = {
  [ServerSocketEvent.ORDER_UPDATED]: (order: OrderResponseDto) => void;
  [ServerSocketEvent.TRUCK_LOCATION_UPDATED]: (payload: {
    truckId: number;
    latLng: GeolocationLatLng;
  }) => void;
};

export { type ServerToClientEvents };
