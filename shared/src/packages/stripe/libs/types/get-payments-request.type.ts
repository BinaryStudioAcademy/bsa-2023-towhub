import { type BusinessEntityT } from '~/packages/business/business.js';
import { type OrderEntity } from '~/packages/orders/orders.js';

type GetPaymentsRequest = {
  businessId: BusinessEntityT['id'];
  orderId?: OrderEntity['id'];
  userId?: OrderEntity['userId'];
  customerName?: OrderEntity['customerName'];
  customerPhone?: OrderEntity['customerPhone'];
  intervalFrom?: Date;
  intervalTo?: Date;
  limit?: number;
  page?: number;
};

export { type GetPaymentsRequest };
