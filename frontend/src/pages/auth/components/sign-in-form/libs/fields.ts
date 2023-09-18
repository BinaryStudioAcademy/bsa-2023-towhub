import { FormLabel, FormName, HttpMessage } from '~/libs/enums/enums.js';
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
    associateServerErrors: [HttpMessage.WRONG_EMAIL],
  },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter your password',
    name: FormName.PASSWORD,
    associateServerErrors: [HttpMessage.WRONG_PASSWORD],
  },
];

export { signInFields };
