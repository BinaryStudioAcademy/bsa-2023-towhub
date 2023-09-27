import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

const DEFAULT_TRUCK_PAYLOAD: Pick<TruckEntityT, 'licensePlateNumber'> = {
  licensePlateNumber: '',
};

export { DEFAULT_TRUCK_PAYLOAD };
