import { type UserSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  name: '',
  surname: '',
  email: '',
  phone: '+380',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  groupId: 1,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
