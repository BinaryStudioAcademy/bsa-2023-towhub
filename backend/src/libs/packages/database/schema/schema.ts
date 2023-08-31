import { business, groups, orders, users } from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  orders,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
