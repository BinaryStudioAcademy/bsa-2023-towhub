import {
  business,
  drivers,
  driversRelations,
  groups,
  trucks,
  trucksRelations,
  truckStatusEnum,
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
  usersRelations,
  driversRelations,
  usersTrucksRelations,
  truckStatusEnum,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
