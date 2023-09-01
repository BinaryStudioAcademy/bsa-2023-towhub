import { business, groups, orders, users, usersRelations } from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  usersRelations,
  orders,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
