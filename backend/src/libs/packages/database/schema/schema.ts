import {
  business,
  drivers,
  driversRelations,
  groups,
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
  trucks,
  trucksRelations,
  users,
  usersTrucks,
  drivers,
  driversRelations,
  usersRelations,
  driversRelations,
  usersTrucksRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
