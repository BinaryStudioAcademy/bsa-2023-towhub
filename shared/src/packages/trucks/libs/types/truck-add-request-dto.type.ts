import { type TowTruckType, type TruckYear } from '../enums/enums.js';

type TruckAddRequestDto = {
  manufacturer: string;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: typeof TruckYear;
  towType: typeof TowTruckType;
  drivers: string[];
};

export { type TruckAddRequestDto };
