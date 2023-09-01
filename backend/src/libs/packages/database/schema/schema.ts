import {
  business,
  files,
  groups,
  users,
  usersRelations,
} from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  usersRelations,
  files,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
