import { METERS_IN_ONE_KM } from '../constants/constants.js';

const convertMetersToKilometers = (meters: number): number => {
  return Math.round(meters / METERS_IN_ONE_KM);
};

export { convertMetersToKilometers };
