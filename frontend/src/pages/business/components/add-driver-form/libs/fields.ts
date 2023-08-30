import { FormLabel, FormName } from '~/libs/enums/enums.js';
import {
  type DriverSignUpRequestDto,
  type FormField,
} from '~/libs/types/types.js';

const addDriverFields: FormField<DriverSignUpRequestDto>[] = [
  {
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter driver first name',
    name: FormName.FIRST_NAME,
  },
  {
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter driver last name',
    name: FormName.LAST_NAME,
  },
  {
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter driver email',
    name: FormName.EMAIL,
  },
  { label: FormLabel.PHONE, placeholder: 'Enter driver phone', name: 'phone' },
  {
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter driver password',
    name: FormName.PASSWORD,
  },
  {
    label: FormLabel.DRIVER_LICENSE_NUMBER,
    placeholder: 'Enter driver license number',
    name: FormName.DRIVER_LICENSE_NUMBER,
  },
];

export { addDriverFields };
