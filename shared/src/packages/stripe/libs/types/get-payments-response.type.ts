import { type Paginated } from '~/libs/types/paginated.js';

import { type PaymentDto } from './payment-dto.type.js';

type GetPaymentsResponse = Paginated<PaymentDto>;

export { type GetPaymentsResponse };
