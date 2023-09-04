import { pgEnum } from 'drizzle-orm/pg-core';
import { OrderStatus } from 'shared/build/index.js';

const orderStatuses = Object.values(OrderStatus as Record<number, string>) as [
  string,
  ...string[],
];

const statusEnum = pgEnum('status_enum', orderStatuses);

export { statusEnum };
