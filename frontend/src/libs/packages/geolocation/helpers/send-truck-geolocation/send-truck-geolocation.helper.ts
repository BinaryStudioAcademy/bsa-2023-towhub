import { ClientSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';

const sendTruckGeolocation = (
  truckId: number,
  { coords }: GeolocationPosition,
): void => {
  socketService.emit<typeof ClientSocketEvent.TRUCK_LOCATION_UPDATE>(
    ClientSocketEvent.TRUCK_LOCATION_UPDATE,
    [
      {
        truckId,
        latLng: { lat: coords.latitude, lng: coords.longitude },
      },
    ],
  );
};

export { sendTruckGeolocation };
