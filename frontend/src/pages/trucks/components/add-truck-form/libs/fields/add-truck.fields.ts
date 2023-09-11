import { type FormField } from '~/libs/types/form.type.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import {
  TruckCapacity,
  TruckPricePerKm,
} from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
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

const ADD_TRUCK_FIELDS: FormField<Omit<TruckEntity, 'id' | 'businessId'>>[] = [
  {
    id: 1,
    type: 'dropdown',
    label: FormLabel.MANUFACTURER,
    name: FormName.MANUFACTURER,
    options: convertToSelectOptions(TruckManufacturer),
  },
  {
    id: 2,
    type: 'dropdown',
    label: FormLabel.TOW_TYPE,
    name: FormName.TOW_TYPE,
    options: convertToSelectOptions(TruckTowType),
  },
  {
    id: 3,
    type: 'number',
    label: FormLabel.YEAR,
    name: FormName.YEAR,
    min: TruckYear.MIN,
    max: TruckYear.MAX,
  },
  {
    id: 4,
    type: 'text',
    label: FormLabel.LICENSE_PLATE,
    placeholder: PLACEHOLDER_LICENSE_PLATE,
    name: FormName.LICENSE_PLATE,
  },
  {
    id: 5,
    type: 'number',
    label: FormLabel.CAPACITY,
    name: FormName.CAPACITY,
    min: TruckCapacity.MIN,
  },
  {
    id: 6,
    type: 'number',
    label: FormLabel.PRICE_PER_KM,
    name: FormName.PRICE_PER_KM,
    min: TruckPricePerKm.MIN,
    max: TruckPricePerKm.MAX,
    step: TruckPricePerKm.STEP,
  },
];

export { ADD_TRUCK_FIELDS };
