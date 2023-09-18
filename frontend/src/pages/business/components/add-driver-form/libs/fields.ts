import { FormLabel, FormName } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';

const addDriverFields: FormField<DriverCreateUpdateRequestDto>[] = [
  {
    id: 1,
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter driver first name',
    name: FormName.FIRST_NAME,
  },
  {
    id: 2,
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter driver last name',
    name: FormName.LAST_NAME,
  },
  {
    id: 3,
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter driver email',
    name: FormName.EMAIL,
  },
  {
    id: 4,
    label: FormLabel.PHONE,
    placeholder: 'Enter driver phone',
    name: 'phone',
  },
  {
    id: 5,
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter driver password',
    name: FormName.PASSWORD,
  },
  {
    id: 6,
    type: 'text',
    label: FormLabel.DRIVER_LICENSE_NUMBER,
    placeholder: 'Enter driver license number',
    name: FormName.DRIVER_LICENSE_NUMBER,
  },
  {
    id: 7,
    type: 'multi-select',
    label: FormLabel.DRIVER_POSSIBLE_TRUCKS,
    name: FormName.DRIVER_POSSIBLE_TRUCKS,
    options: [],
  },
];

export { addDriverFields };
