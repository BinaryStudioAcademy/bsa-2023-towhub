import { FormLabel, FormName, HttpMessage } from '~/libs/enums/enums.js';
import { type FormField } from '~/libs/types/form.type.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import {
  TruckCapacity,
  TruckPricePerKm,
} from '~/packages/trucks/libs/enums/enums.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import {
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

const ADD_TRUCK_FIELDS: FormField<
  Omit<TruckEntityT, 'id' | 'businessId' | 'createdAt' | 'status'>
>[] = [
  {
    id: FormLabel.MANUFACTURER,
    type: 'dropdown',
    label: FormLabel.MANUFACTURER,
    name: FormName.MANUFACTURER,
    options: convertToSelectOptions(TruckManufacturer),
  },
  {
    id: FormLabel.TOW_TYPE,
    type: 'dropdown',
    label: FormLabel.TOW_TYPE,
    name: FormName.TOW_TYPE,
    options: convertToSelectOptions(TruckTowType),
  },
  {
    id: FormLabel.YEAR,
    type: 'number',
    label: FormLabel.YEAR,
    name: FormName.YEAR,
    min: TruckYear.MIN,
    max: TruckYear.MAX,
    placeholder: 'Enter a year starting from 2000',
  },
  {
    id: FormLabel.LICENSE_PLATE,
    type: 'text',
    label: FormLabel.LICENSE_PLATE,
    placeholder: PLACEHOLDER_LICENSE_PLATE,
    name: FormName.LICENSE_PLATE,
    associateServerErrors: [HttpMessage.TRUCK_EXISTS],
  },
  {
    id: FormLabel.CAPACITY,
    type: 'number',
    label: FormLabel.CAPACITY,
    name: FormName.CAPACITY,
    min: TruckCapacity.MIN,
    placeholder: 'Enter the capacity in tons',
  },
  {
    id: FormLabel.PRICE_PER_KM,
    type: 'number',
    label: FormLabel.PRICE_PER_KM,
    name: FormName.PRICE_PER_KM,
    min: TruckPricePerKm.MIN,
    max: TruckPricePerKm.MAX,
    step: TruckPricePerKm.STEP,
    placeholder: 'Enter the payment per kilometer in USD',
  },
];

export { ADD_TRUCK_FIELDS };
