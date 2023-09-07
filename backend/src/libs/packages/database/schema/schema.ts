import {
  business,
  drivers,
  driversRelations,
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
  drivers,
  driversRelations,
  usersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
