import {
  business,
  drivers,
  driversRelations,
  groups,
  shifts,
  trucks,
  trucksRelations,
  users,
  usersRelations,
  usersTrucks,
  usersTrucksRelations,
} from './tables-schema.js';

const schema = {
  business,
  groups,
  shifts,
  trucks,
  trucksRelations,
  users,
  usersTrucks,
  drivers,
  usersRelations,
  driversRelations,
  usersTrucksRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
