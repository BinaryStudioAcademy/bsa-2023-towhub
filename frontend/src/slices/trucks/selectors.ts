import { type RootState } from '~/libs/types/types.js';

import { name as TruckSliceName } from './trucks.slice.js';

const selectTrucks = (
  state: RootState,
): RootState[typeof TruckSliceName]['trucks'] => state[TruckSliceName].trucks;

const selectChosenTruck = (
  state: RootState,
): RootState[typeof TruckSliceName]['chosenTruck'] => {
  return state[TruckSliceName].chosenTruck;
};

export { selectChosenTruck, selectTrucks };
