import { type DataStatus } from '~/libs/enums/enums.js';
import {
  type RootState,
  type TruckEntityT,
  type ValueOf,
} from '~/libs/types/types.js';
import { type GetAllTrucksByUserIdResponseDto } from '~/packages/trucks/trucks.js';

const selectDataStatus = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.trucks.dataStatus;
};

const selectTrucks = (state: RootState): GetAllTrucksByUserIdResponseDto =>
  state.trucks.trucks;

const selectTruck =
  (truckId: number | null) =>
  (state: RootState): TruckEntityT | undefined =>
    truckId
      ? state.trucks.trucks.items.find((truck) => truck.id === truckId)
      : undefined;

export { selectDataStatus, selectTruck, selectTrucks };
