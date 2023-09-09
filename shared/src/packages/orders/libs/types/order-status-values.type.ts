import { type ValueOf } from '~/libs/types/value-of.type.js';

import { type OrderStatus } from '../enums/enums.js';

type OrderStatusValues = ValueOf<typeof OrderStatus>;

export { type OrderStatusValues };
