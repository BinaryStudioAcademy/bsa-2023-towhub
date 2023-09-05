import { type ValueOf } from 'shared/build';

import { type TowTruckType } from './enum.js';

type TruckEntity = {
  id: number;
  manufacturer: string;
  towType: ValueOf<typeof TowTruckType>;
  year: number;
  licensePlateNumber: string;
  capacity: number;
  pricePerKm: number;
};

export { type TruckEntity };
