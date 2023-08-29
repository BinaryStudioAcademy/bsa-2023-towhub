import { type FormField } from '~/libs/types/form.type.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import {
  FormLabel,
  FormName,
  TowTruckType,
  TruckManufacturer,
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
    type: 'text',
    label: FormLabel.LICENSE_PLATE,
    placeholder: PLACEHOLDER_LICENSE_PLATE,
    name: FormName.LICENSE_PLATE,
  },
  {
    type: 'dropdown',
    label: FormLabel.MANUFACTURER,
    name: FormName.MANUFACTURER,
    options: convertToSelectOptions(TruckManufacturer),
  },
  {
    type: 'dropdown',
    label: FormLabel.YEAR,
    name: FormName.YEAR,
    options: convertToSelectOptions(TruckYear),
  },
  {
    type: 'number',
    label: FormLabel.CAPACITY,
    name: FormName.CAPACITY,
  },
  {
    type: 'number',
    label: FormLabel.PRICE_PER_KM,
    name: FormName.PRICE_PER_KM,
    min: 1,
    max: 100,
    currency: '$',
  },
  {
    type: 'text',
    label: FormLabel.DRIVERS,
    name: FormName.DRIVERS,
    options: [],
  },
  {
    type: 'dropdown',
    label: FormLabel.TOW_TYPE,
    name: FormName.TOW_TYPE,
    options: convertToSelectOptions(TowTruckType),
  },
];

export { ADD_TRUCK_FIELDS };
