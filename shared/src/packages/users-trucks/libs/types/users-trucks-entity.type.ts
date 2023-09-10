import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';
import { type UserEntityT } from '~/packages/users/libs/types/types.js';

type UsersTrucksEntityT = {
  id: number;
  userId: UserEntityT['id'];
  truckId: TruckEntityT['id'];
};

export { type UsersTrucksEntityT };
