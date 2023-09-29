import { type OrderResponseDto } from '~/packages/orders/orders.js';

type GenerateCheckoutLinkRequest = {
  order: OrderResponseDto;
};

export { type GenerateCheckoutLinkRequest };
