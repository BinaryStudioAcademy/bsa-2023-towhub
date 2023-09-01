import { type UserEntityT } from './user-entity.type.js';
import { type UserGroupEntityObjectT } from './user-group-entity.type.js';

type CustomerSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: UserGroupEntityObjectT };

export { type CustomerSignUpResponseDto };
