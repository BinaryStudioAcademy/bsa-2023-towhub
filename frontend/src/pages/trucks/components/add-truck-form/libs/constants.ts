import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckAddRequestDto,
  'manufacturer' | 'year' | 'towType'
> = {
  licensePlateNumber: '',
  capacity: 0,
  pricePerKm: 1,
  drivers: '',
};

export { DEFAULT_TRUCK_PAYLOAD };
