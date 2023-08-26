import { type TruckEntity as TruckEntityT } from '../types.js';

type TruckEntityDatabase = Omit<TruckEntityT, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

export { type TruckEntityDatabase };
