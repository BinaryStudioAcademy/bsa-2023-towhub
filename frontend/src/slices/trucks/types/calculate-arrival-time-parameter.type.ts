import { type TruckLocationPayload } from './truck-location-payload.type.js';

type CalculateArrivalTimeParameter = {
  origin: TruckLocationPayload;
  destination: string;
};

export { type CalculateArrivalTimeParameter };
