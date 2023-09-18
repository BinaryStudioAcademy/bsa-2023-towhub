import { ServerSocketEvent } from '~/libs/packages/socket/libs/enums/enums.js';
import { socket as socketService } from '~/libs/packages/socket/socket.js';

const sendTruckGeolocation = (
  truckId: number,
  { coords }: GeolocationPosition,
): void => {
  socketService.emit({
    event: ServerSocketEvent.TRUCK_LOCATION_UPDATE,
    eventPayload: {
      truckId,
      latLng: { latitude: coords.latitude, longitude: coords.longitude },
    },
  });
};

export { sendTruckGeolocation };
