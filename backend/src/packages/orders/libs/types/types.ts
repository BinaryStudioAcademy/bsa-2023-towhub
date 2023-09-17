import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type OrderDatabaseModel = InferModel<DatabaseSchema['orders']>;

export {
  type DriverInfo,
  type Id,
  type OrderCreateRequestDto,
  type OrderEntity,
  type OrderFindByIdResponseDto,
  type OrderResponseDto,
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateRequestDto,
} from 'shared/build/index.js';
export { type OrderDatabaseModel };
