import { type EntityPagination } from '~/libs/types/types.js';

import { type PaymentDto } from './payment-dto.type.js';

type GetPaymentsResponse = EntityPagination<PaymentDto>;

export { type GetPaymentsResponse };
