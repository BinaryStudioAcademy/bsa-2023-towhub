import {
  business,
  groups,
  trucks,
  users,
  usersRelations,
  usersTrucks,
} from './tables-schema.js';

const schema = {
  business,
  groups,
  trucks,
  users,
  usersTrucks,
  usersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
