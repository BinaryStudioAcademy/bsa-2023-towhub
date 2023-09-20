import { type DriverCreateUpdateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: Omit<DriverCreateUpdateRequestDto, 'password'>;
};

export { type DriverAddPayload };
