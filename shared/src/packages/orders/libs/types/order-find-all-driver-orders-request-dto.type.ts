import { type GetPaginatedPageQuery } from '~/libs/types/get-page-request-dto.type.js';

import { type OrderStatusValues } from './order-status-values.type.js';

type OrderFindAllDriverOrdersQuery = GetPaginatedPageQuery & {
  status?: OrderStatusValues;
};

export { type OrderFindAllDriverOrdersQuery };
