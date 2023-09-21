import { type ValueOf } from '~/libs/types/value-of.type.js';

type GeolocationLatLng = {
  lat: ValueOf<Pick<GeolocationCoordinates, 'latitude'>>;
  lng: ValueOf<Pick<GeolocationCoordinates, 'longitude'>>;
};

export { type GeolocationLatLng };
