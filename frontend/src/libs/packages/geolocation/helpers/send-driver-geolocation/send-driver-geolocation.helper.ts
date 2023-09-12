import { ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';

const sendDriverGeolocation = (
  driverId: number,
  { coords }: GeolocationPosition,
): void => {
  socketService.emit(ServerSocketEvent.DRIVER_LOCATION_UPDATE, {
    driverId,
    latLng: { latitude: coords.latitude, longitude: coords.longitude },
  });
};

export { sendDriverGeolocation };
