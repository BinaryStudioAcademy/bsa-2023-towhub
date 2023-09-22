import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

type TruckDataSocketPayload = Pick<TruckEntityT, 'id'>;

export { type TruckDataSocketPayload };
