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
  type OrderFindAllUserOrdersQuery,
  type OrderFindAllUserOrdersResponseDto,
  type OrderFindByIdResponseDto,
  type OrderQueryParameters,
  type OrderResponseDto,
  type OrdersListResponseDto,
  type OrderStatusValues,
  type OrderUpdateAcceptStatusRequestDto,
  type OrderUpdateAcceptStatusRequestParameter,
  type OrderUpdateAcceptStatusResponseDto,
  type OrderUpdateRequestDto,
} from 'shared/build/index.js';
export { type OrderDatabaseModel };
