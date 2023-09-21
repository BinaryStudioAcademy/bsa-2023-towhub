import { type DataStatus } from '~/libs/enums/enums.js';
import {
  type RootState,
  type TruckEntityT,
  type ValueOf,
} from '~/libs/types/types.js';

const selectDataStatus = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.trucks.dataStatus;
};

const selectTrucks = (state: RootState): TruckEntityT[] => state.trucks.trucks;

const selectTruck =
  (truckId: number | null) =>
  (state: RootState): TruckEntityT | undefined =>
    truckId
      ? state.trucks.trucks.find((truck) => truck.id === truckId)
      : undefined;

const selectChosenTruck = (
  state: RootState,
): (TruckEntityT & { driverId: number }) | null => state.trucks.chosenTruck;

export { selectChosenTruck, selectDataStatus, selectTruck, selectTrucks };
