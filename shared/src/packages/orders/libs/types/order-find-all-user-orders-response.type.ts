import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderFindAllUserOrdersResponse = {
  items: OrderResponseDto[];
  total: number;
};

export { type OrderFindAllUserOrdersResponse };
