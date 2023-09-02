import { type UserGroupEntityT } from './types.js';
import { type UserEntityT } from './user-entity.type.js';

type BusinessSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: UserGroupEntityT };

export { type BusinessSignUpResponseDto };
