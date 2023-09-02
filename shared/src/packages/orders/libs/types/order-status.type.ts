import { type OrderStatus } from '../enums/enums.js';

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export { type OrderStatus };
