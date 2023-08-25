import { type UserEntityT } from './user-entity.type.js';

type UserSignUpRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
