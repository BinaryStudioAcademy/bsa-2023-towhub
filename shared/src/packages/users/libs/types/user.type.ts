import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserEntityT } from './user-entity.type.js';
import { type UserGroupEntityT } from './user-group-entity.type.js';

type UserWithoutSensitiveData = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
>;

type User = UserWithoutSensitiveData & {
  business: BusinessEntityT[];
  group: UserGroupEntityT;
};

export { type User };
