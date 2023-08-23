import { type UserSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  phone: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  groupId: 1,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
