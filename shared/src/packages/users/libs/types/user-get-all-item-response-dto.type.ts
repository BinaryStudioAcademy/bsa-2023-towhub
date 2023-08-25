import { type UserEntityT } from './user-entity.type.js';

type UserGetAllItemResponseDto = Pick<UserEntityT, 'id' | 'phone'>;

export { type UserGetAllItemResponseDto };
