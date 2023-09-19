import { type DriverDto } from '../types.js';

type DriverCreateUpdateRequestDto = DriverDto & {
  password: string;
  truckIds: number[];
};

export { type DriverCreateUpdateRequestDto };
