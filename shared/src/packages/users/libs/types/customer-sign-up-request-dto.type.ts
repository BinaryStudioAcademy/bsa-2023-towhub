import { type UserEntityT } from './user-entity.type.js';

type CustomerSignUpRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId'
> & {
  password: string;
};

export { type CustomerSignUpRequestDto };
