import { type Coordinates } from '~/libs/types/types.js';
import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

const getTrucksLocations = (
  trucks: TruckGetItemResponseDto[],
): Coordinates[] => {
  const locations: Coordinates[] = [];
  for (const truck of trucks) {
    if (truck.location?.lat) {
      locations.push(truck.location);
    }
  }

  return locations;
};

export { getTrucksLocations };
