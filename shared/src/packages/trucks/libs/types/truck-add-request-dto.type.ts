import { type TruckEntity } from './truck-entity.type.js';

type TruckAddRequestDto = Omit<TruckEntity, 'id' | 'createdAt'>;

export { type TruckAddRequestDto };
