import {
  business,
  drivers,
  driversRelations,
  groups,
  orders,
  ordersRelations,
  shifts,
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
  truckStatusEnum,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
