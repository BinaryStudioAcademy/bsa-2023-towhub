import { type Coordinates } from '~/libs/types/types.js';

type MapServiceParameters = {
  mapElement: HTMLDivElement | null;
  center?: Coordinates;
  zoom?: number;
  bounds?: google.maps.LatLngBounds;
};
export { type MapServiceParameters };
