import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type ShiftDatabaseModel = InferModel<DatabaseSchema['shifts']>;

export {
  type ShiftCloseRequestDto,
  type ShiftCreateRequestDto,
  type ShiftEntity,
  type ShiftResponseDto,
} from 'shared/build/index.js';
export { type ShiftDatabaseModel };
