import { type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
  type TruckYear,
} from '../enums/enums.js';

type TruckAddRequestDto = {
  manufacturer: ValueOf<typeof TruckManufacturer> | null;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: ValueOf<typeof TruckYear> | null;
  towType: ValueOf<typeof TruckTowType> | null;
  drivers: string;
};

export { type TruckAddRequestDto };
