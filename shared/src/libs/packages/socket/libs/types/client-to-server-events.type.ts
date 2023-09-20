import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';

import { type ClientSocketEvent } from '../enums/client-socket-event.enum.js';

type ClientToServerEvents = {
  [ClientSocketEvent.TRUCK_LOCATION_UPDATE]: (payload: {
    truckId: number;
    latLng: GeolocationLatLng;
  }) => void;
  [ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES]: (payload: {
    orderId: string;
  }) => void;
  [ClientSocketEvent.UNSUBSCRIBE_ORDER_UPDATES]: (payload: {
    orderId: string;
  }) => void;
  [ClientSocketEvent.SUBSCRIBE_TRUCK_UPDATES]: (payload: {
    truckId: string;
  }) => void;
  [ClientSocketEvent.UNSUBSCRIBE_TRUCK_UPDATES]: (payload: {
    truckId: string;
  }) => void;
};

export { type ClientToServerEvents };
