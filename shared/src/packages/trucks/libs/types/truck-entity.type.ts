import {
  type TowTruckType,
  type TruckManufacturer,
  type TruckYear,
} from '../enums/enums.js';

type TruckEntity = {
  manufacturer: typeof TruckManufacturer;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: typeof TruckYear;
  towType: typeof TowTruckType;
};

export { type TruckEntity };
