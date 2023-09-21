import { type RootState, type TruckEntity } from '~/libs/types/types.js';

import { name as TruckSliceName } from './trucks.slice.js';

const selectTrucks = (
  state: RootState,
): RootState[typeof TruckSliceName]['trucks'] => state[TruckSliceName].trucks;

const selectChosenTruck = (state: RootState): TruckEntity | null =>
  state[TruckSliceName].chosenTruck;

export { selectChosenTruck, selectTrucks };
