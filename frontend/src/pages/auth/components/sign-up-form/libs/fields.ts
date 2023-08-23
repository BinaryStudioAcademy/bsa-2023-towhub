import { FormLabel, FormName } from '~/libs/enums/enums.js';
import {
  type FormField,
  type UserSignUpRequestDto,
} from '~/libs/types/types.js';

const signUpFields: FormField<UserSignUpRequestDto>[] = [
  {
    label: FormLabel.NAME,
    placeholder: 'Enter your name',
    name: FormName.NAME,
  },
  {
    label: FormLabel.SURNAME,
    placeholder: 'Enter your surname',
    name: FormName.SURNAME,
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

export { signUpFields };
