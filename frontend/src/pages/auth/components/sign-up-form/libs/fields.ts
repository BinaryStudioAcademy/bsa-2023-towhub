import { FormLabel, FormName } from '~/libs/enums/enums.js';
import {
  type FormField,
  type UserSignUpRequestDto,
} from '~/libs/types/types.js';

const signUpFields: FormField<UserSignUpRequestDto>[] = [
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
  {
    label: FormLabel.PHONE,
    placeholder: 'Enter your phone',
    name: 'phone',
  },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter your password',
    name: FormName.PASSWORD,
  },
];

export { signUpFields };
