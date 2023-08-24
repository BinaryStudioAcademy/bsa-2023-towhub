import { groups, users } from './tables-schema.js';

const schema = {
  users,
  groups,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
