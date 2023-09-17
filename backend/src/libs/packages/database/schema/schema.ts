import {
  business,
  drivers,
  driversRelations,
  files,
  fileVerificationStatus,
  fileVerificationStatusRelations,
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
  business,
  drivers,
  driversRelations,
  fileVerificationStatus,
  fileVerificationStatusRelations,
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
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
