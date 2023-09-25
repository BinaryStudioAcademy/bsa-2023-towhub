import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderFindAllUserOrdersResponseDto = {
  items: OrderResponseDto[];
  total: number;
};

export { type OrderFindAllUserOrdersResponseDto };
