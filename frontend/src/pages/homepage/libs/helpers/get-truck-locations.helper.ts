import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

type GetTruckLocations = {
  lat: number;
  lng: number;
};

const getTruckLocations = (
  trucks: TruckGetItemResponseDto[],
): GetTruckLocations[] => {
  const locations: GetTruckLocations[] = [];
  for (const truck of trucks) {
    if (truck.location) {
      locations.push(truck.location);
    }
  }

  return locations;
};

export { getTruckLocations };
