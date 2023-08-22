import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<
  UserEntity,
  'phone' | 'name' | 'email' | 'surname'
> & {
  password: string;
};

export { type UserSignUpRequestDto };
