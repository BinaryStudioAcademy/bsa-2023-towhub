import { type UserEntityT } from './user-entity.type.js';
import { type UserGroupEntityT } from './user-group-entity.type.js';

type UserSignInResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: UserGroupEntityT };

export { type UserSignInResponseDto };
