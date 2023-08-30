import { type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
  type TruckYear,
} from '../enums/enums.js';

type TruckAddRequestDto = {
  manufacturer: {
    label: string;
    value: ValueOf<typeof TruckManufacturer>;
  };
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: {
    label: string;
    value: ValueOf<typeof TruckYear>;
  };
  towType: {
    label: string;
    value: ValueOf<typeof TruckTowType>;
  };
  drivers: string;
};

export { type TruckAddRequestDto };
