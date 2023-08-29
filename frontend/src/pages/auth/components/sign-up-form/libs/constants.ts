import { type BusinessSignUpRequestDto } from 'shared/build/packages/users/libs/types/business-sign-up-request-dto.type';

import { type CustomerSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER: CustomerSignUpRequestDto = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
};

const DEFAULT_SIGN_UP_PAYLOAD_BUSINESS: BusinessSignUpRequestDto = {
  email: '',
  phone: '+380',
  password: '',
  firstName: '',
  lastName: '',
  companyName: '',
  taxNumber: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD_BUSINESS, DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER };
