import { type UserEntityT } from './user-entity.type.js';

type CustomerSignUpResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt'
>;

export { type CustomerSignUpResponseDto };
