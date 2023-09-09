import { type ShiftEntity } from './shift-entity.type.js';

type ShiftCreateResponseDto = Omit<ShiftEntity, 'endDate'>;
export { type ShiftCreateResponseDto };
