import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import {
  TowTruckType,
  TruckManufacturer,
  TruckYear,
} from '~/packages/trucks/trucks.js';

const DEFAULT_TRUCK_PAYLOAD: TruckAddRequestDto = {
  licensePlateNumber: '',
  manufacturer: TruckManufacturer.MILLER_INDUSTRIES,
  year: TruckYear[2011],
  capacity: 0,
  pricePerKm: 1,
  drivers: '',
  towType: TowTruckType.FLATBED_OR_ROLLBACK,
};

export { DEFAULT_TRUCK_PAYLOAD };
