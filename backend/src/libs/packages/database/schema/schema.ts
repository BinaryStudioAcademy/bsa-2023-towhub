import { business, drivers, groups, users } from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  drivers,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
