import { users } from './tables-schema.js';

const schema = {
  users,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
