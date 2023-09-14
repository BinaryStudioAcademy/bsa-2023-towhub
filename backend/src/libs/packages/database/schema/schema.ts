import {
  business,
  businessRelations,
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
  businessRelations,
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
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
