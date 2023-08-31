import { type UserEntityT } from './user-entity.type.js';

// import { type UserGroupEntityT } from './user-group-entity.type.js';

//temporary type!!!
type GroupEntityT = { id: number; name: string; key: string };

type CustomerSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt' | 'groupId'
> & { group: GroupEntityT };

export { type CustomerSignUpResponseDto };
