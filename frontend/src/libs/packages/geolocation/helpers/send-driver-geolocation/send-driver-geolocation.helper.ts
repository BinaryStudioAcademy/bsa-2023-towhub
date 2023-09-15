import { ClientSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';

const sendDriverGeolocation = (
  driverId: number,
  { coords }: GeolocationPosition,
): void => {
  socketService.emit<typeof ClientSocketEvent.DRIVER_LOCATION_UPDATE>(
    ClientSocketEvent.DRIVER_LOCATION_UPDATE,
    [
      {
        driverId,
        latLng: { latitude: coords.latitude, longitude: coords.longitude },
      },
    ],
  );
};

export { sendDriverGeolocation };
