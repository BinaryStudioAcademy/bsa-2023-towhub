import {
  type BusinessSignUpRequestDto,
  type CustomerSignUpRequestDto,
} from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER: CustomerSignUpRequestDto = {
  email: '',
  phone: '',
  password: '',
  firstName: '',
  lastName: '',
};

const DEFAULT_SIGN_UP_PAYLOAD_BUSINESS: BusinessSignUpRequestDto = {
  email: '',
  phone: '',
  password: '',
  firstName: '',
  lastName: '',
  companyName: '',
  taxNumber: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD_BUSINESS, DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER };
