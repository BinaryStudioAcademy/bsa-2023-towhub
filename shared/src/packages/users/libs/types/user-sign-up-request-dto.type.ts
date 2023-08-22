import { type UserEntity } from './user-entity.type.js';

type UserSignUpRequestDto = Pick<UserEntity, 'phone'> & {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export { type UserSignUpRequestDto };
