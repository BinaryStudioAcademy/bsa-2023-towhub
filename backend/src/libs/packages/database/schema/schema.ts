import {
  business,
  drivers,
  driversRelations,
  groups,
  users,
  usersRelations,
} from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  drivers,
  usersRelations,
  driversRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
