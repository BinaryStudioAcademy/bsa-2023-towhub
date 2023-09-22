import { type RootState } from '~/libs/types/types.js';

import { name as TruckSliceName } from './trucks.slice.js';
import { type TruckArrivalTime, type TruckLocation } from './types/types.js';

const selectTrucks = (
  state: RootState,
): RootState[typeof TruckSliceName]['trucks'] => {
  return state[TruckSliceName].trucks;
};

const selectChosenTruck = (
  state: RootState,
): RootState[typeof TruckSliceName]['chosenTruck'] => {
  return state[TruckSliceName].chosenTruck;
};

const selectTruckLocation = (state: RootState): TruckLocation | null => {
  return state.trucks.truckLocation;
};

const selectTruckArrivalTime = (state: RootState): TruckArrivalTime | null => {
  return state.trucks.truckArrivalTime;
};

export {
  selectChosenTruck,
  selectTruckArrivalTime,
  selectTruckLocation,
  selectTrucks,
};
