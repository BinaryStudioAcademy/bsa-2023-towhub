import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckEntity,
  'id' | 'manufacturer' | 'towType' | 'businessId'
> = {
  licensePlateNumber: '',
  capacity: 0,
  year: 0,
  pricePerKm: 0,
};

export { DEFAULT_TRUCK_PAYLOAD };
