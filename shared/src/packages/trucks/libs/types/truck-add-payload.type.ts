import { type TruckEntity as TruckEntityT } from './truck-entity.type.js';

type TruckAddPayload = {
  payload: Omit<TruckEntityT, 'id' | 'createdAt' | 'businessId'>;
  businessId: number;
};

export { type TruckAddPayload };
