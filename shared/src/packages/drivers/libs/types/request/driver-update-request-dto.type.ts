import { type DriverDto } from '../types.js';

type DriverUpdateRequestDto = DriverDto & {
  password: string;
  truckIds?: number[];
};

export { type DriverUpdateRequestDto };
