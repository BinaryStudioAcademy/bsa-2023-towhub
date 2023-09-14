import {
  business,
  drivers,
  driversRelations,
  groups,
  orders,
  ordersRelations,
  shifts,
  shiftsRelations,
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
  shiftsRelations,
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
