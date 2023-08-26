import { type UserEntityT } from './user-entity.type.js';

type UserSignUpResponseDto = Omit<UserEntityT, 'passwordHash' | 'passwordSalt'>;

export { type UserSignUpResponseDto };
