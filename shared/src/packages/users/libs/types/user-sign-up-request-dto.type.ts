import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Omit<
  UserEntity,
  'id' | 'passwordHash' | 'passwordSalt'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
