import { type UserEntityT } from './user-entity.type.js';

type UserSignInResponseDto = Omit<UserEntityT, 'id' | 'passwordHash' | 'passwordSalt' | 'groupId'>;

export { type UserSignInResponseDto };
