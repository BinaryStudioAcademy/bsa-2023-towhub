import { Config } from '~/libs/packages/config/config.package.js';
import { type StartWatchTruckLocation } from '~/slices/trucks/types/start-watch-truck-location.type.js';

import { notification } from '../../../notification/notification.js';
import { ClientToServerEvent, socket } from '../../../socket/socket.js';
import { GeolocationMessages } from '../enums/geolocation-messages.enum.js';
import { type GeolocationLatLng } from '../types/types.js';

type GetLocationError = (error: string) => void;

type GetLocationSuccess = (location: GeolocationLatLng) => void;

const socketInstance = socket.getInstance();

const VITE_DRIVER_GEOLOCATION_UPDATE_INTERVAL = new Config().ENV.API
  .VITE_DRIVER_GEOLOCATION_UPDATE_INTERVAL;

let getLocationSuccess: GetLocationSuccess;
let getLocationError: GetLocationError;
const location = new Promise<GeolocationLatLng>((resolve, reject) => {
  getLocationSuccess = resolve;
  getLocationError = reject;
});
const handleUpdateSuccess = (position: GeolocationPosition): void => {
  getLocationSuccess({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
};
const handleUpdateError = (error: GeolocationPositionError): void => {
  getLocationError(error.message);
};

const updateGeolocation = async (
  payload: StartWatchTruckLocation,
  setUpdateLocationInterval: (interval: NodeJS.Timer) => void,
): Promise<boolean | null> => {
  if (socketInstance) {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(handleUpdateSuccess, handleUpdateError);

    try {
      const latLng = await location;

      const interval = setInterval(() => {
        socketInstance.emit(ClientToServerEvent.TRUCK_LOCATION_UPDATE, {
          truckId: payload.truckId,
          latLng,
        });
      }, VITE_DRIVER_GEOLOCATION_UPDATE_INTERVAL);

      setUpdateLocationInterval(interval);

      return true;
    } catch (error: unknown) {
      if (typeof error === 'string') {
        notification.error(GeolocationMessages.ERROR);
      }
    }
  }

  return null;
};

export { updateGeolocation };
