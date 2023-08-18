import { type UserEntity } from './user-entity.type.js';

type UserSignUpResponseDto = Pick<UserEntity, 'id' | 'phone'>;

export { type UserSignUpResponseDto };
