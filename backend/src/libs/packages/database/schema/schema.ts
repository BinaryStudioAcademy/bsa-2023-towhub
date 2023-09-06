import {
  business,
  drivers,
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
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
