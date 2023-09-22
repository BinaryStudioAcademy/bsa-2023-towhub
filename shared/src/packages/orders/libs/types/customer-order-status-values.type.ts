import { type ValueOf } from '~/libs/types/value-of.type.js';

import { type CustomerOrderStatus } from '../enums/customer-order-status-value.enum.js';

type CustomerOrderStatusValues = ValueOf<typeof CustomerOrderStatus>;

export { type CustomerOrderStatusValues };
