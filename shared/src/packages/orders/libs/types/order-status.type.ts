import { type OrderStatus } from '../enums/enums.js';

type OrderStatusT = (typeof OrderStatus)[keyof typeof OrderStatus];

export { type OrderStatusT };
