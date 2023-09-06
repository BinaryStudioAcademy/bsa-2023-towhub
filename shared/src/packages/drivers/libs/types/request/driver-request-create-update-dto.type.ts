import { type DriverDto } from '../types.js';

type DriverCreateUpdateRequestDto = DriverDto & {
  password: string;
};

export { type DriverCreateUpdateRequestDto };
