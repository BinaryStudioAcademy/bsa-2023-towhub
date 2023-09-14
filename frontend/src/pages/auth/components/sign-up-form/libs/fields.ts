import { FormLabel, FormName, HttpMessage } from '~/libs/enums/enums.js';
import {
  type BusinessSignUpRequestDto,
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
    associateServerErrors: [HttpMessage.USER_EMAIL_EXISTS],
  },
  {
    label: FormLabel.PHONE,
    placeholder: 'Enter your phone',
    name: FormName.PHONE,
    associateServerErrors: [HttpMessage.USER_PHONE_EXISTS],
  },
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
    associateServerErrors: [HttpMessage.USER_EMAIL_EXISTS],
  },
  {
    label: FormLabel.PHONE,
    placeholder: 'Enter your phone',
    name: FormName.PHONE,
    associateServerErrors: [HttpMessage.USER_PHONE_EXISTS],
  },
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
