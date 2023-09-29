import { type GetPaginatedPageQuery } from '~/libs/types/get-page-request-dto.type.js';

import { type OrderStatusValues } from './order-status-values.type.js';

type OrderFindAllUserOrdersQuery = GetPaginatedPageQuery & {
  status?: OrderStatusValues;
};

export { type OrderFindAllUserOrdersQuery };
