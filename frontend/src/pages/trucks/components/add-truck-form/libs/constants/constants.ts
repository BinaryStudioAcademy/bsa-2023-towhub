import { type TruckFormModel } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<TruckFormModel, 'manufacturer' | 'towType'> =
  {
    licensePlateNumber: '',
    capacity: 0,
    year: 0,
    pricePerKm: 0,
  };

export { DEFAULT_TRUCK_PAYLOAD };
