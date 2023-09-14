import {
  business,
  drivers,
  driversRelations,
  files,
  groups,
  orders,
  ordersRelations,
  shifts,
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
  shifts,
  trucks,
  trucksRelations,
  users,
  usersTrucks,
  drivers,
  usersRelations,
  driversRelations,
  usersTrucksRelations,
  orders,
  ordersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
