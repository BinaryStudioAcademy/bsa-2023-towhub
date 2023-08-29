import { type BusinessSignUpRequestDto } from 'shared/build/packages/users/libs/types/business-sign-up-request-dto.type';

import { FormLabel, FormName } from '~/libs/enums/enums.js';
import {
  type CustomerSignUpRequestDto,
  type FormField,
} from '~/libs/types/types.js';

const signUpCustomerFields: FormField<CustomerSignUpRequestDto>[] = [
  {
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter your first name',
    name: FormName.FIRST_NAME,
  },
  {
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter your last name',
    name: FormName.LAST_NAME,
  },
  {
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter your email',
    name: FormName.EMAIL,
  },
  { label: FormLabel.PHONE, placeholder: 'Enter your phone', name: 'phone' },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter your password',
    name: FormName.PASSWORD,
  },
];

const signUpBusinessFields: FormField<BusinessSignUpRequestDto>[] = [
  {
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter your first name',
    name: FormName.FIRST_NAME,
  },
  {
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter your last name',
    name: FormName.LAST_NAME,
  },
  {
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter your email',
    name: FormName.EMAIL,
  },
  { label: FormLabel.PHONE, placeholder: 'Enter your phone', name: 'phone' },
  {
    label: FormLabel.COMPANY_NAME,
    placeholder: 'Enter the name of company',
    name: FormName.COMPANY_NAME,
  },
  {
    label: FormLabel.TAX_NUMBER,
    placeholder: 'Enter the tax number of company',
    name: FormName.TAX_NUMBER,
  },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter your password',
    name: FormName.PASSWORD,
  },
];

export { signUpBusinessFields, signUpCustomerFields };
