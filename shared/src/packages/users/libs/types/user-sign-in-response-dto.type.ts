import { type UserEntityT } from './user-entity.type.js';

type UserSignInResponseDto = Omit<
  UserEntityT,
  'passwordHash' | 'passwordSalt'
> & {
  token: string;
};

export { type UserSignInResponseDto };
