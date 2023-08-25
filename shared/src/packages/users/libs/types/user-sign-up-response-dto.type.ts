import { type UserEntityT } from './user-entity.type.js';

type UserSignUpResponseDto = Pick<UserEntityT, 'id' | 'phone'>;

export { type UserSignUpResponseDto };
