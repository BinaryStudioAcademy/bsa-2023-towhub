import { type ValueOf } from '~/libs/types/value-of.type.js';

import {
  type TruckManufacturer,
  type TruckTowType,
  type TruckYear,
} from '../enums/enums.js';

type TruckEntity = {
  manufacturer: ValueOf<typeof TruckManufacturer>;
  towType: ValueOf<typeof TruckTowType>;
  year: ValueOf<typeof TruckYear>;
  licensePlateNumber: string;
  capacity: number;
  pricePerKm: number;
};

export { type TruckEntity };
