import { type FormField } from '~/libs/types/form.type.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import {
  TruckCapacity,
  TruckPricePerKm,
} from '~/packages/trucks/libs/enums/enums.js';
import { type TruckFormModel } from '~/packages/trucks/libs/types/types.js';
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

const ADD_TRUCK_FIELDS: FormField<TruckFormModel>[] = [
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
    type: 'number',
    label: FormLabel.YEAR,
    name: FormName.YEAR,
    min: TruckYear.MIN,
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
    min: TruckCapacity.MIN,
  },
  {
    type: 'number',
    label: FormLabel.PRICE_PER_KM,
    name: FormName.PRICE_PER_KM,
    min: TruckPricePerKm.MIN,
    max: TruckPricePerKm.MAX,
    step: TruckPricePerKm.STEP,
  },
  {
    type: 'text',
    label: FormLabel.DRIVERS,
    name: FormName.DRIVERS,
    options: [],
  },
];

export { ADD_TRUCK_FIELDS };
