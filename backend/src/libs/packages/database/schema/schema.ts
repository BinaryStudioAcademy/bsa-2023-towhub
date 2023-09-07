import {
  business,
  drivers,
  groups,
  orders,
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
  drivers,
  usersRelations,
  orders,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
