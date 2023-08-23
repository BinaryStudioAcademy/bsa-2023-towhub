import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<
  UserEntity,
  'phone' | 'email' | 'firstName' | 'lastName' | 'groupId'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
