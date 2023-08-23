import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<
  UserEntity,
  'phone' | 'firstName' | 'lastName' | 'email' | 'firstName' | 'lastName'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
