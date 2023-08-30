import { type FormField } from '~/libs/types/form.type.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import {
  FormLabel,
  FormName,
  TruckManufacturer,
  TruckTowType,
  TruckYear,
} from '~/packages/trucks/trucks.js';

const PLACEHOLDER_LICENSE_PLATE = 'Enter License Plate number';

const convertToSelectOptions = (
  data: Record<string, string>,
): SelectOption[] => {
  return Object.keys(data).map((key) => ({
    label: key.replace(/_/g, ' '),
    value: data[key],
  }));
};

const ADD_TRUCK_FIELDS: FormField<TruckAddRequestDto>[] = [
  {
    type: 'dropdown',
    label: FormLabel.MANUFACTURER,
    name: FormName.MANUFACTURER,
    options: convertToSelectOptions(TruckManufacturer),
  },
  {
    type: 'dropdown',
    label: FormLabel.TOW_TYPE,
    name: FormName.TOW_TYPE,
    options: convertToSelectOptions(TruckTowType),
  },
  {
    type: 'dropdown',
    label: FormLabel.YEAR,
    name: FormName.YEAR,
    options: convertToSelectOptions(TruckYear),
  },
  {
    type: 'text',
    label: FormLabel.LICENSE_PLATE,
    placeholder: PLACEHOLDER_LICENSE_PLATE,
    name: FormName.LICENSE_PLATE,
  },
  {
    type: 'number',
    label: FormLabel.CAPACITY,
    name: FormName.CAPACITY,
    min: 0,
  },
  {
    type: 'number',
    label: FormLabel.PRICE_PER_KM,
    name: FormName.PRICE_PER_KM,
    min: 1,
    max: 100,
    step: '0.10',
  },
  {
    type: 'text',
    label: FormLabel.DRIVERS,
    name: FormName.DRIVERS,
    options: [],
  },
];

export { ADD_TRUCK_FIELDS };
