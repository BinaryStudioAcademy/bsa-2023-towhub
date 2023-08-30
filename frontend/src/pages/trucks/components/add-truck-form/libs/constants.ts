import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: TruckAddRequestDto = {
  licensePlateNumber: '',
  manufacturer: null,
  year: null,
  capacity: 0,
  pricePerKm: 1,
  drivers: '',
  towType: null,
};

export { DEFAULT_TRUCK_PAYLOAD };
