import {
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupAndDriverT,
  type UserEntityObjectWithGroupT,
} from './user-entity.type.js';

type UserSignInResponseDto =
  | UserEntityObjectWithGroupT
  | UserEntityObjectWithGroupAndBusinessT
  | UserEntityObjectWithGroupAndDriverT;

export { type UserSignInResponseDto };
