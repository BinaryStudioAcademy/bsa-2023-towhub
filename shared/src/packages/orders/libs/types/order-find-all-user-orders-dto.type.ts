import { type GetPaginatedPageQuery } from '~/libs/types/get-page-request-dto.type.js';

import { type CustomerOrderStatusValues } from './customer-order-status-values.type.js';

type OrderFindAllUserOrdersQuery = GetPaginatedPageQuery & {
  status?: CustomerOrderStatusValues;
};

export { type OrderFindAllUserOrdersQuery };
