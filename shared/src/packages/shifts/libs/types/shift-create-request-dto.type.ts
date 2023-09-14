import { type ShiftEntity } from './shift-entity.type.js';

type ShiftCreateRequestDto = Pick<
  ShiftEntity,
  'startDate' | 'truckId' | 'driverId'
>;
export { type ShiftCreateRequestDto };
