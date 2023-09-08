import {
  business,
  drivers,
  files,
  groups,
  trucks,
  trucksRelations,
  users,
  usersRelations,
  usersTrucks,
  usersTrucksRelations,
} from './tables-schema.js';

const schema = {
  files,
  business,
  groups,
  trucks,
  trucksRelations,
  users,
  usersTrucks,
  drivers,
  usersRelations,
  usersTrucksRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
