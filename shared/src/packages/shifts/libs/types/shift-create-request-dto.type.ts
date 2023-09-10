import { type ShiftEntity } from './shift-entity.type.js';

type ShiftCreateRequestDto = Pick<
  ShiftEntity,
  'startDate' | 'truckId' | 'driverUserId'
>;
export { type ShiftCreateRequestDto };
