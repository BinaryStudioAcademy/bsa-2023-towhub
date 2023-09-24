import { type ShiftEntityT } from './shift-entity.type.js';

type ShiftCreateRequestDto = Pick<
  ShiftEntityT,
  'startDate' | 'truckId' | 'driverId'
>;
export { type ShiftCreateRequestDto };
