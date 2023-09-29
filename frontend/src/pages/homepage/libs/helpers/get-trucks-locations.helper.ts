import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

const getTrucksLocations = (
  trucks: TruckGetItemResponseDto[],
): google.maps.LatLngLiteral[] => {
  const locations: google.maps.LatLngLiteral[] = [];
  for (const truck of trucks) {
    if (truck.location?.lat) {
      locations.push(truck.location);
    }
  }

  return locations;
};

export { getTrucksLocations };
