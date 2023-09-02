import { objectPick } from 'shared/build/index.js';

import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type UserSignInResponseDto,
} from '~/libs/types/types.js';

import { type AuthUserT } from '../types/auth-user.js';

const extractUserFromPayload = (
  payload:
    | UserSignInResponseDto
    | CustomerSignUpResponseDto
    | BusinessSignUpResponseDto,
): AuthUserT => {
  const result = objectPick(payload, [
    'phone',
    'email',
    'firstName',
    'lastName',
    'accessToken',
  ]) as AuthUserT;
  result.group = payload.group.key;

  return result;
};

export { extractUserFromPayload };
