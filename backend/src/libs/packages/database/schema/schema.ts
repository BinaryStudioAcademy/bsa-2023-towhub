import {
  business,
  groups,
  groupsRelations,
  users,
  usersRelations,
} from './tables-schema.js';

const schema = {
  users,
  groups,
  business,
  groupsRelations,
  usersRelations,
};

type DatabaseSchema = typeof schema;

export { type DatabaseSchema };
export { schema };
