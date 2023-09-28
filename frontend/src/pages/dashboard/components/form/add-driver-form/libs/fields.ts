import { fileInputAddDriverLicenseConfig } from '~/libs/components/file-input/libs/config/config.js';
import { FormLabel, FormName } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/types.js';
import { type DriverCreateRequestDto } from '~/packages/drivers/drivers.js';
import { type FileObject } from '~/slices/files/libs/types/types.js';

const addDriverFields: FormField<DriverCreateRequestDto<FileObject>>[] = [
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
  {
    id: FormLabel.DRIVER_LICENSE_SCAN,
    type: 'file',
    label: FormLabel.DRIVER_LICENSE_SCAN,
    name: FormName.DRIVER_LICENSE_SCAN,
    fileInputConfig: fileInputAddDriverLicenseConfig,
  },
];

export { addDriverFields };
