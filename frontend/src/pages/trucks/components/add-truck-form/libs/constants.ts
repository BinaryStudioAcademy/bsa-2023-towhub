import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Omit<
  TruckAddRequestDto,
  'manufacture' | 'year' | 'towType'
> = {
  licensePlateNumber: '',
  capacity: 0,
  pricePerKm: 1,
  drivers: '',
  manufacturer: {
    label: '',
    value: 'miller_industries',
  },
};

export { DEFAULT_TRUCK_PAYLOAD };
