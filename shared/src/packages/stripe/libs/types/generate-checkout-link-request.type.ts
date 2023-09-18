import { type OrderEntity } from '~/packages/orders/orders.js';
import { type ShiftEntity } from '~/packages/shifts/shifts.js';

type GenerateCheckoutLinkRequest = {
  order: OrderEntity;
  shift: ShiftEntity;
  distance: number;
};

export { type GenerateCheckoutLinkRequest };
