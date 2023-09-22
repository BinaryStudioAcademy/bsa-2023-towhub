import { type DriverDto } from '../types.js';

type DriverCreateRequestDto = DriverDto & {
  truckIds?: number[];
};

export { type DriverCreateRequestDto };
