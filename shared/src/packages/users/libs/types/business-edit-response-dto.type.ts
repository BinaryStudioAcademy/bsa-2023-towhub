import { type UserEntityObjectWithGroupAndBusinessT } from './user-entity.type.js';

type BusinessEditResponseDto = Omit<
  UserEntityObjectWithGroupAndBusinessT,
  'group'
>;

export { type BusinessEditResponseDto };
