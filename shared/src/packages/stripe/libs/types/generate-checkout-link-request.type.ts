import { type OrderEntity } from '~/packages/orders/orders.js';

type GenerateCheckoutLinkRequest = {
  order: OrderEntity;
};

export { type GenerateCheckoutLinkRequest };
