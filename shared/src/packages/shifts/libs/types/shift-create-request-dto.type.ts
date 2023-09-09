import { type ShiftEntity } from './shift-entity.type.js';

type ShiftCreateRequestDto = Pick<ShiftEntity, 'startDate' | 'truckId'>;
export { type ShiftCreateRequestDto };
