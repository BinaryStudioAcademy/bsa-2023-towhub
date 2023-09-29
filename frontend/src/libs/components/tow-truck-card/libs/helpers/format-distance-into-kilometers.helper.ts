import { DECIMAL_POINTS, METERS_IN_KILOMETER } from '../constants/constants.js';

const formatDistanceIntoKilometers = (distance: number): string => {
  return (distance / METERS_IN_KILOMETER).toFixed(DECIMAL_POINTS);
};

export { formatDistanceIntoKilometers };
