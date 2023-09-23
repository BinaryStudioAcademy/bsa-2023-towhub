import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

type TruckDataSocketPayload = { truckId: TruckEntityT['id'] };

export { type TruckDataSocketPayload };
