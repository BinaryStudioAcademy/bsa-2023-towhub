import { type GeolocationLatLng } from '~/libs/packages/geolocation/geolocation.js';

import { type TruckEntity } from './truck-entity.type.js';

type TruckGetItemResponseDto = TruckEntity & {
  location?: GeolocationLatLng;
};

export { type TruckGetItemResponseDto };
