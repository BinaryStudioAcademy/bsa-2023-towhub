import { type ValueOf } from '~/libs/types/types.js';

import {
  type TowTruckType,
  type TruckManufacturer,
  type TruckYear,
} from '../enums/enums.js';

type TruckAddRequestDto = {
  manufacturer: ValueOf<typeof TruckManufacturer>;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: ValueOf<typeof TruckYear>;
  towType: ValueOf<typeof TowTruckType>;
  drivers: string;
};

export { type TruckAddRequestDto };
