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
      latLng: { lat: coords.latitude, lng: coords.longitude },
    },
  });
};

export { sendTruckGeolocation };
