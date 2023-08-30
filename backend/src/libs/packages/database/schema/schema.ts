import { business, groups, users, usersRelations } from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  usersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
