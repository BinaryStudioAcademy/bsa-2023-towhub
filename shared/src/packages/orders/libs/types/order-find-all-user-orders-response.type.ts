import { type OrderResponseDto } from './order-response-dto.type.js';

type FindAllUserOrdersResponse = { items: OrderResponseDto[]; total: number };

export { type FindAllUserOrdersResponse };
