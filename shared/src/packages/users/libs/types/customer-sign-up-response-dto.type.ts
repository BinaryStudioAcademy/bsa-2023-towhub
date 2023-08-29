import { type UserEntityT } from './user-entity.type.js';

type CustomerSignUpResponseDto = Pick<UserEntityT, 'id' | 'phone' | 'accessToken'>;

export { type CustomerSignUpResponseDto };
