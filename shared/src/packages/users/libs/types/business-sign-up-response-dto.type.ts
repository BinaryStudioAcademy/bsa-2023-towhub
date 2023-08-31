import { type BusinessEntityT } from '~/packages/business/business.js';

import { type UserEntityT } from './user-entity.type.js';

// import { type UserGroupEntityT } from './user-group-entity.type.js';

//temporary type!!!
type GroupEntityT = { id: number; name: string; key: string };

type BusinessSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: GroupEntityT } & { business: BusinessEntityT[] };

export { type BusinessSignUpResponseDto };
