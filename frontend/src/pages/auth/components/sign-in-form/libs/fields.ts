import { FormLabel, FormName } from '~/libs/enums/enums.js';
import {
  type FormField,
  type UserSignInRequestDto,
} from '~/libs/types/types.js';

const signInFields: FormField<UserSignInRequestDto>[] = [
  {
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter your email',
    name: FormName.EMAIL,
  },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter your password',
    name: FormName.PASSWORD,
  },
];

export { signInFields };
