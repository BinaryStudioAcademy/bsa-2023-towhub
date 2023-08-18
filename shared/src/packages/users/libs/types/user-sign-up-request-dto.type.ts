import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<UserEntity, 'phone'> & {
  password: string;
};

export { type UserSignUpRequestDto };
