import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
} from '../../enums/enums.js';

type TruckFormModel = {
  manufacturer: SelectOption<ValueOf<typeof TruckManufacturer>>;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: number;
  towType: SelectOption<ValueOf<typeof TruckTowType>>;
};

export { type TruckFormModel };
