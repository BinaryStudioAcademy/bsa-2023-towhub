import { type Coordinates } from '~/libs/types/types.js';

import { type TruckLocationPayload } from './truck-location-payload.type.js';

type CalculateArrivalTimeParameter = {
  origin: TruckLocationPayload;
  destination: Coordinates;
};

export { type CalculateArrivalTimeParameter };
