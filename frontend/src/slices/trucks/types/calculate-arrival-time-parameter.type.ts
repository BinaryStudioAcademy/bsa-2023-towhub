import { type TruckLocationPayload } from './truck-location-payload.type.js';

type CalculateArrivalTimeParameter = {
  origin: TruckLocationPayload;
  destination: google.maps.LatLngLiteral;
};

export { type CalculateArrivalTimeParameter };
