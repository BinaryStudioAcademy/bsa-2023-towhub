import { business, groups, users } from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
