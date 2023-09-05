import { type ValueOf } from '~/libs/types/value-of.type.js';

import { type OrderStatus } from '../enums/order-status.enum.js';

type OrderStatus = ValueOf<typeof OrderStatus>;

export { type OrderStatus };
