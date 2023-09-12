import { type ServerSocketEvent } from '../enums/server-socket-event.enum.js';

type ClientToServerEvents = {
  [ServerSocketEvent.DRIVER_LOCATION_UPDATE]: (payload: {
    driverId: number;
    latLng: { latitude: number; longitude: number };
  }) => void;
};

export { type ClientToServerEvents };
