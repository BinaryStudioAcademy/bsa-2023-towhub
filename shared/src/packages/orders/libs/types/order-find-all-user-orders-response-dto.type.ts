import { type EntityPagination } from '~/libs/types/entity-pagination.type.js';

import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderFindAllUserOrdersResponseDto = EntityPagination<OrderResponseDto>;

export { type OrderFindAllUserOrdersResponseDto };
