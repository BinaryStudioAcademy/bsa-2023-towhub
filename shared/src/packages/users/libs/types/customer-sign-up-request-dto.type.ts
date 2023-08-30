import { type UserEntityT } from './user-entity.type.js';

type CustomerSignUpRequestDto = Omit<
  UserEntityT,
  'id' | 'passwordHash' | 'passwordSalt' | 'groupId' | 'accessToken'
> & {
  password: string;
};

export { type CustomerSignUpRequestDto };
