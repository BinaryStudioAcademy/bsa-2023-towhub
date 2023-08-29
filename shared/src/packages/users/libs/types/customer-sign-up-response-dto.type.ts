import { type UserEntityT } from './user-entity.type.js';

type CustomerSignUpResponseDto = Pick<UserEntityT, 'id' | 'phone'>;

export { type CustomerSignUpResponseDto };
