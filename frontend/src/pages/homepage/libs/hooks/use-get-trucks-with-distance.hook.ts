import { useAppSelector, useEffect, useState } from '~/libs/hooks/hooks.js';
import { MapConnector } from '~/libs/packages/map/map-connector.package.js';
import { selectTrucks } from '~/slices/trucks/selectors.js';

import { type TruckWithDistance } from '../types/types.js';

const useGetTrucksWithDistance = (
  userLocation?: google.maps.LatLngLiteral,
): TruckWithDistance[] => {
  const [trucksWithDistance, setTrucksWithDistance] = useState<
    TruckWithDistance[]
  >([]);
  const trucks = useAppSelector(selectTrucks);

  useEffect(() => {
    const calculateDistances = async (): Promise<void> => {
      await MapConnector.getInstance();

      const mapService = new MapConnector().getMapService({
        mapElement: null,
      });

      const calculateDistance = async (
        truckLocation: google.maps.LatLngLiteral,
        userLocation: google.maps.LatLngLiteral,
      ): Promise<number | undefined> => {
        try {
          return await mapService.calculateDistance(
            truckLocation,
            userLocation,
          );
        } catch {
          return undefined;
        }
      };

      const trucksWithDistance = await Promise.all(
        trucks.map(async (truck) => {
          const distance =
            truck.location && userLocation
              ? await calculateDistance(truck.location, userLocation)
              : undefined;

          return { ...truck, distance };
        }),
      );
      setTrucksWithDistance(trucksWithDistance);
    };

    void calculateDistances();
  }, [trucks, userLocation]);

  return userLocation
    ? trucksWithDistance.filter(
        (truck) => truck.distance === 0 || !!truck.distance,
      )
    : trucksWithDistance;
};

export { useGetTrucksWithDistance };
