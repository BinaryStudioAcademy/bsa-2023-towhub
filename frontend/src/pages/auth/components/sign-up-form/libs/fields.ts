import { type UserSignUpRequestDto } from 'shared/build';

import { type FormField } from '~/libs/types/form.type.js';

const signUpFields: FormField<UserSignUpRequestDto>[] = [
  { label: 'Name', placeholder: 'Enter your name', name: 'name' },
  { label: 'Surname', placeholder: 'Enter your surname', name: 'surname' },
  {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    name: 'email',
  },
  { label: 'Phone', placeholder: 'Enter your phone', name: 'phone' },
  {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    name: 'password',
  },
];

export { signUpFields };
