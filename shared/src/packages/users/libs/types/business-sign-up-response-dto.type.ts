import { type UserEntityT } from './user-entity.type.js';

type BusinessSignUpResponseDto = Pick<UserEntityT, 'id' | 'phone'>;

export { type BusinessSignUpResponseDto };
