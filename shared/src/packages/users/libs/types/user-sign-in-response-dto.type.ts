import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserEntityT } from './user-entity.type.js';
import { type UserGroupEntityT } from './user-group-entity.type.js';

type UserSignInResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: UserGroupEntityT } & { business: BusinessEntityT[] };

export { type UserSignInResponseDto };
