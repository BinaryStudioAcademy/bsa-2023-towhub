import {
  business,
  drivers,
  groups,
  orders,
  users,
  usersRelations,
} from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  drivers,
  usersRelations,
  orders,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
