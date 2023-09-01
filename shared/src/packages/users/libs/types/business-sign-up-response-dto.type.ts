import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserEntityT } from './user-entity.type.js';
import { type UserGroupEntityObjectT } from './user-group-entity.type.js';

// import { type UserGroupEntityT } from './user-group-entity.type.js';

// // TODO: refactor the type!
// type GroupEntityT = { id: number; name: string; key: string };

type BusinessSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: UserGroupEntityObjectT } & { business: BusinessEntityT };

export { type BusinessSignUpResponseDto };
