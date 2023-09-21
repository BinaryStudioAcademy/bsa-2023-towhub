import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';
import { type TruckEntity } from '~/packages/trucks/trucks.js';

import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ServerToClientEvents = {
  [ServerSocketEvent.ORDER_UPDATED]: (order: OrderResponseDto) => void;
  [ServerSocketEvent.TRUCK_LOCATION_UPDATED]: (payload: {
    truckId: number;
    latLng: GeolocationLatLng;
  }) => void;
  [ServerSocketEvent.TRUCKS_LIST_UPDATE]: (payload: TruckEntity[]) => void;
};

export { type ServerToClientEvents };
