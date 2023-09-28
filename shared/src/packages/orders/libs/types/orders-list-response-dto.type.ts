import { type OrderResponseDto } from './order-response-dto.type.js';

type OrdersListResponseDto = {
  items: OrderResponseDto[];
  total: number;
};

export { type OrdersListResponseDto };
