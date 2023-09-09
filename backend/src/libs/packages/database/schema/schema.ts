import {
  business,
  drivers,
  groups,
  shifts,
  trucks,
  users,
  usersRelations,
  usersTrucks,
} from './tables-schema.js';

const schema = {
  business,
  groups,
  shifts,
  trucks,
  users,
  usersTrucks,
  drivers,
  usersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
