import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';

import { type ClientSocketEvent } from '../enums/enums.js';

type ServerSocketEventParameter = {
  [ClientSocketEvent.TRUCK_LOCATION_UPDATE]: {
    latLng: GeolocationLatLng;
    truckId: number;
  };
};

export { type ServerSocketEventParameter };
