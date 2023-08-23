import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<
  UserEntity,
  'phone' | 'firstName' | 'lastName' | 'email'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
