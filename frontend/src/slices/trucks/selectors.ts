import { type DataStatus } from '~/libs/enums/enums.js';
import {
  type RootState,
  type TruckEntityT,
  type ValueOf,
} from '~/libs/types/types.js';

import { name as TruckSliceName } from './trucks.slice.js';

const selectDataStatus = (state: RootState): ValueOf<typeof DataStatus> => {
  return state.trucks.dataStatus;
};

const selectTrucks = (state: RootState): TruckEntityT[] => state.trucks.trucks;
const selectChosenTruck = (
  state: RootState,
): RootState[typeof TruckSliceName]['chosenTruck'] => {
  return state[TruckSliceName].chosenTruck;
};

export { selectChosenTruck, selectDataStatus, selectTrucks };
