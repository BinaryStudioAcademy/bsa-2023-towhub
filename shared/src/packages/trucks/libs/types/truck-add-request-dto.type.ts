import { type TruckEntity } from './truck-entity.type.js';

type TruckAddRequestDto = Omit<TruckEntity, 'id' | 'createdAt' | 'businessId'>;

export { type TruckAddRequestDto };
