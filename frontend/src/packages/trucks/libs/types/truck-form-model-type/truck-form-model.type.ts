import { type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
} from '../../enums/enums.js';

type TruckFormModel = {
  manufacturer: {
    label: string;
    value: ValueOf<typeof TruckManufacturer>;
  };
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: number;
  towType: {
    label: string;
    value: ValueOf<typeof TruckTowType>;
  };
  drivers: string;
};

export { type TruckFormModel };
