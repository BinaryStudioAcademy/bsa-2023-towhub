import { type GeolocationLatLng } from '~/libs/packages/geolocation/types/types.js';

import { type ServerSocketEvent } from '../enums/enums.js';

type ServerSocketEventParameter = {
  [ServerSocketEvent.TRUCK_LOCATION_UPDATE]: {
    latLng: GeolocationLatLng;
    truckId: number;
  };
};

export { type ServerSocketEventParameter };
