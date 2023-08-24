import { type UserEntity } from './user-entity.type.js';

type UserSignInRequestDto = Pick<UserEntity, 'email'> & {
  password: string;
};

export { type UserSignInRequestDto };
