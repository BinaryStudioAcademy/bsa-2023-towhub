import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderFindAllDriverOrdersResponseDto = {
  items: OrderResponseDto[];
  total: number;
};

export { type OrderFindAllDriverOrdersResponseDto };
