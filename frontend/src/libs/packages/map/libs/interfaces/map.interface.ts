import { type Coordinates } from '~/libs/types/types.js';

interface IMapService {
  calculateRouteAndTime(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<number>;
  calculateDistance(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<number>;
  addMarker(position: Coordinates): void;
}

export { type IMapService };
