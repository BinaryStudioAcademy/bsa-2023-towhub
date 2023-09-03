import { type TruckFormModel } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckFormModel,
  'manufacturer' | 'year' | 'towType' | 'pricePerKm'
> = {
  licensePlateNumber: '',
  capacity: 0,
  drivers: '',
};

export { DEFAULT_TRUCK_PAYLOAD };
