import { FormLabel, FormName, HttpMessage } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/types.js';
import {
  type BusinessEditDto,
  type CustomerEditDto,
} from '~/packages/users/users.js';

const editCustomerFields: FormField<CustomerEditDto>[] = [
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
];

const editBusinessFields: FormField<BusinessEditDto>[] = [
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
];

export { editBusinessFields, editCustomerFields };
