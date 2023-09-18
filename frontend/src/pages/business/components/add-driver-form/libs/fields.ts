import { FormLabel, FormName } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';

const addDriverFields: FormField<DriverCreateUpdateRequestDto>[] = [
  {
    fieldId: 1,
    label: FormLabel.FIRST_NAME,
    placeholder: 'Enter driver first name',
    name: FormName.FIRST_NAME,
  },
  {
    fieldId: 2,
    label: FormLabel.LAST_NAME,
    placeholder: 'Enter driver last name',
    name: FormName.LAST_NAME,
  },
  {
    fieldId: 3,
    type: 'email',
    label: FormLabel.EMAIL,
    placeholder: 'Enter driver email',
    name: FormName.EMAIL,
  },
  {
    fieldId: 4,
    label: FormLabel.PHONE,
    placeholder: 'Enter driver phone',
    name: 'phone',
  },
  {
    fieldId: 5,
    type: 'password',
    label: FormLabel.PASSWORD,
    placeholder: 'Enter driver password',
    name: FormName.PASSWORD,
  },
  {
    fieldId: 6,
    type: 'text',
    label: FormLabel.DRIVER_LICENSE_NUMBER,
    placeholder: 'Enter driver license number',
    name: FormName.DRIVER_LICENSE_NUMBER,
  },
  {
    fieldId: 7,
    type: 'multi-select',
    label: FormLabel.DRIVER_POSSIBLE_TRUCKS,
    name: FormName.DRIVER_POSSIBLE_TRUCKS,
    options: [],
  },
];

export { addDriverFields };
