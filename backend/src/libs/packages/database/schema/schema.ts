import { business, users } from './tables-schema.js';

const schema = {
  users,
  business
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
