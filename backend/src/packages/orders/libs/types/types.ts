import { type InferModel } from 'drizzle-orm';

import { type DatabaseSchema } from '~/libs/packages/database/database.js';

type OrderDatabaseModel = InferModel<DatabaseSchema['orders']>;

export {
  type DriverInfo,
  type Id,
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
  type OrderCreateRequestDto,
  type OrderEntity,
  type OrderFindByIdResponseDto,
  type OrderResponseDto,
  type OrderUpdateRequestDto,
} from 'shared/build/index.js';
export { type OrderDatabaseModel };
