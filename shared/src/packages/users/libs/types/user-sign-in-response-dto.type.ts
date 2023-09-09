import {
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupT,
} from './user-entity.type.js';

type UserSignInResponseDto =
  | UserEntityObjectWithGroupT
  | UserEntityObjectWithGroupAndBusinessT;

export { type UserSignInResponseDto };
