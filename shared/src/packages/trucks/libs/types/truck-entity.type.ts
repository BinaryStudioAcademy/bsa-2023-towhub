import { type ValueOf } from '~/libs/types/types.js';

import { type TruckManufacturer, type TruckTowType } from '../enums/enums.js';

type TruckEntityT = {
  id: number;
  manufacturer: ValueOf<typeof TruckManufacturer>;
  towType: ValueOf<typeof TruckTowType>;
  year: number;
  licensePlateNumber: string;
  capacity: number;
  pricePerKm: number;
  businessId: number;
  createdAt: string;
};

export { type TruckEntityT };
