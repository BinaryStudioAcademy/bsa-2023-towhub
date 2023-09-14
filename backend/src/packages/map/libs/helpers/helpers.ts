import { METERS_IN_ONE_KM } from '../constants/constants.js';

const convertMetersToKm = (meters: number): number => {
  return meters / METERS_IN_ONE_KM;
};

export { convertMetersToKm };
