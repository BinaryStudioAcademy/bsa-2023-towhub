import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type ShiftDatabaseModel = InferModel<DatabaseSchema['shifts']>;

export {
  type ShiftCreateRequestDto,
  type ShiftCreateResponseDto,
  type ShiftEntity,
} from 'shared/build/index.js';
export { type ShiftDatabaseModel };
