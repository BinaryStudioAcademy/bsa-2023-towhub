import { type UserEntity } from './user-entity.type.js';

type UserSignInResponseDto = Omit<
  UserEntity,
  'passwordHash' | 'passwordSalt'
> & {
  token: string;
};

export { type UserSignInResponseDto };
