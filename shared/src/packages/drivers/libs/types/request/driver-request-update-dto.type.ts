import { type DriverDto } from '../types.js';

type DriverUpdateRequestDto = DriverDto & {
  password: string;
};

export { type DriverUpdateRequestDto };
