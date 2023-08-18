import { type UserEntity } from './user-entity.type.js';

type UserGetAllItemResponseDto = Pick<UserEntity, 'id' | 'phone'>;

export { type UserGetAllItemResponseDto };
