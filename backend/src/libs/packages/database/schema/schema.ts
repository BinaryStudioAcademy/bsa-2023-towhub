import {
  business,
  drivers,
  driversRelations,
  files,
  groups,
  orders,
  ordersRelations,
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
  driversRelations,
  usersTrucksRelations,
  orders,
  ordersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
