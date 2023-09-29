import { type OrderEntity } from '~/packages/orders/orders.js';

type CheckoutMetadata = {
  orderId: OrderEntity['id'];
} & Pick<
  OrderEntity,
  'businessId' | 'userId' | 'customerName' | 'customerPhone'
>;

export { type CheckoutMetadata };
