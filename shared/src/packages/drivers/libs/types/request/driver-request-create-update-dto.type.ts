import { type DriverDto } from '../types.js';

type DriverCreateUpdateRequestDto = DriverDto & {
  password: string;
  driverTrucks: number[];
};

export { type DriverCreateUpdateRequestDto };
