import { groups, trucks, users, usersTrucks } from './tables-schema.js';

const schema = {
  groups,
  trucks,
  users,
  usersTrucks,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
