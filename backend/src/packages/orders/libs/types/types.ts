import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type OrderDatabaseModel = InferModel<DatabaseSchema['orders']>;

export {
  type Id,
  type OrderCreateRequestDto,
  type OrderCreateResponseDto,
  type OrderEntity,
  type OrderFindByIdResponseDto,
  type OrderResponseDto,
  type OrderUpdateRequestDto,
  type OrderUpdateResponseDto,
} from 'shared/build/index.js';
export { type OrderDatabaseModel };
