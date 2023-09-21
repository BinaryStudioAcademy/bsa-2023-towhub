import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckEntityT,
  'id' | 'manufacturer' | 'towType' | 'status' | 'businessId'
> = {
  licensePlateNumber: '',
  capacity: 0,
  year: 0,
  pricePerKm: 0,
};

export { DEFAULT_TRUCK_PAYLOAD };
