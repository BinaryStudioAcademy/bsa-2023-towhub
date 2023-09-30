import { type Coordinates } from '~/libs/types/types.js';

const getBounds = (points: Coordinates[]): google.maps.LatLngBounds => {
  const bounds = new google.maps.LatLngBounds();

  for (const point of points) {
    bounds.extend(point);
  }

  return bounds;
};

export { getBounds };
