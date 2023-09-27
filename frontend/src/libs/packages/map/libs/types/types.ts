type Icon = {
  url: string;
  anchor: google.maps.Point;
  size: google.maps.Size;
  scale: number;
};

type PlaceLatLng = {
  startPoint: google.maps.LatLngLiteral;
  endPoint: google.maps.LatLngLiteral;
};

export { type MapServiceParameters } from './map-service-parameters.type.js';
export {
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
} from 'shared/build/index.js';
export { type Icon, type PlaceLatLng };
