import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type ShiftDatabaseModel = InferModel<DatabaseSchema['shifts']>;

export { type StartedShift } from './started-shifts-map-record.type.js';
export { type StartedShiftsStore } from './started-shifts-store.type.js';
export {
  type ShiftCloseRequestDto,
  type ShiftCreateRequestDto,
  type ShiftEntityT,
  type ShiftResponseDto,
} from 'shared/build/index.js';
export { type ShiftDatabaseModel };
