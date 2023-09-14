import { type ClientSocketEvent } from '../enums/client-socket-event.enum.js';

type ClientToServerEvents = {
  [ClientSocketEvent.DRIVER_LOCATION_UPDATE]: (payload: {
    driverId: number;
    latLng: {
      latitude: number;
      longitude: number;
    };
  }) => void;
  [ClientSocketEvent.SUBSCRIBE_ORDER_UPDATES]: (payload: {
    orderId: string;
  }) => void;
};

export { type ClientToServerEvents };
