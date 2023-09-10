import { type TruckEntityT } from '../truck-entity.type.js';

type GetAllTrucksByUserIdResponseDto = {
  items: TruckEntityT[];
  count: number;
};

export { type GetAllTrucksByUserIdResponseDto };
