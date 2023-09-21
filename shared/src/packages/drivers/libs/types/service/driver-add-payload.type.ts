import { type DriverCreateUpdateRequestDto } from '../types.js';

type DriverAddPayload = {
  payload: Omit<DriverCreateUpdateRequestDto, 'password'>;
  reference: string;
};

export { type DriverAddPayload };
