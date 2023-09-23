import { type TruckEntityT } from './truck-entity.type.js';

type TruckAddRequestDto = Omit<
  TruckEntityT,
  'id' | 'createdAt' | 'businessId' | 'status'
>;

export { type TruckAddRequestDto };
