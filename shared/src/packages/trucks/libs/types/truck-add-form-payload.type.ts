import { type TruckEntity } from './truck-entity.type.js';

type TruckAddFormPayload = Omit<TruckEntity, 'id' | 'createdAt' | 'businessId'>;

export { type TruckAddFormPayload };
