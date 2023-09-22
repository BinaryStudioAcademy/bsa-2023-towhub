import { FormLabel, FormName } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';

const addDriverFields: FormField<DriverCreateUpdateRequestDto>[] = [
  {
    id: FormLabel.FIRST_NAME,
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter driver first name',
    name: FormName.FIRST_NAME,
  },
  {
    id: FormLabel.LAST_NAME,
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter driver last name',
    name: FormName.LAST_NAME,
  },
  {
    id: FormLabel.EMAIL,
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter driver email',
    name: FormName.EMAIL,
  },
  {
    id: FormLabel.PHONE,
    label: FormLabel.PHONE,
    placeholder: 'Enter driver phone',
    name: 'phone',
  },
  {
    id: FormLabel.PASSWORD,
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter driver password',
    name: FormName.PASSWORD,
  },
  {
    id: FormLabel.DRIVER_LICENSE_NUMBER,
    type: 'text',
    label: FormLabel.DRIVER_LICENSE_NUMBER,
    placeholder: 'Enter driver license number',
    name: FormName.DRIVER_LICENSE_NUMBER,
  },
  {
    id: FormLabel.DRIVER_POSSIBLE_TRUCKS,
    type: 'multi-select',
    label: FormLabel.DRIVER_POSSIBLE_TRUCKS,
    name: FormName.DRIVER_POSSIBLE_TRUCKS,
    options: [],
  },
];

export { addDriverFields };
