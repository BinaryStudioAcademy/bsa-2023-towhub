import { type UserEntityT } from './user-entity.type.js';

type UserSignInRequestDto = Pick<UserEntityT, 'email'> & {
  password: string;
};

export { type UserSignInRequestDto };
