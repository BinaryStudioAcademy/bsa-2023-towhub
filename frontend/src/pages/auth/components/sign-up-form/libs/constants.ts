import { type CustomerSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: CustomerSignUpRequestDto = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
