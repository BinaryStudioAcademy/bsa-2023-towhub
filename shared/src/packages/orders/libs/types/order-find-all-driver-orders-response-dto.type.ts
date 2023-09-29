import { type EntityPagination } from '~/libs/types/entity-pagination.type.js';

import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderFindAllDriverOrdersResponseDto = EntityPagination<OrderResponseDto>;

export { type OrderFindAllDriverOrdersResponseDto };
