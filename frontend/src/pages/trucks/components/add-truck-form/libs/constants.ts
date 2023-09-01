import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckAddRequestDto,
  'manufacturer' | 'year' | 'towType' | 'pricePerKm'
> = {
  licensePlateNumber: '',
  capacity: 0,
  drivers: '',
};

export { DEFAULT_TRUCK_PAYLOAD };
