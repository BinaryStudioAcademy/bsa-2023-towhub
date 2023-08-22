import { type UserSignUpRequestDto } from 'shared/build';

import { FormLabels, FormNames } from '~/libs/enums/form.enum';
import { type FormField } from '~/libs/types/form.type.js';

const signUpFields: FormField<UserSignUpRequestDto>[] = [
  {
    label: FormLabels.NAME,
    placeholder: 'Enter your name',
    name: FormNames.NAME,
  },
  {
    label: FormLabels.SURNAME,
    placeholder: 'Enter your surname',
    name: FormNames.SURNAME,
  },
  {
    type: 'email',
    label: FormLabels.EMAIL,
    placeholder: 'Enter your email',
    name: FormNames.EMAIL,
  },
  { label: FormLabels.PHONE, placeholder: 'Enter your phone', name: 'phone' },
  {
    type: 'password',
    label: FormLabels.PASSWORD,
    placeholder: 'Enter your password',
    name: FormNames.PASSWORD,
  },
];

export { signUpFields };
