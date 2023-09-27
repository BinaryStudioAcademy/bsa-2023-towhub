import { type RootState } from '~/libs/types/types.js';

import { name as TruckSliceName } from './trucks.slice.js';

const selectDataStatus = (
  state: RootState,
): RootState[typeof TruckSliceName]['dataStatus'] => {
  return state.trucks.dataStatus;
};

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

const selectTruckLocation = (
  state: RootState,
): RootState[typeof TruckSliceName]['truckLocation'] => {
  return state.trucks.truckLocation;
};

const selectTruckArrivalTime = (
  state: RootState,
): RootState[typeof TruckSliceName]['truckArrivalTime'] => {
  return state.trucks.truckArrivalTime;
};

export {
  selectChosenTruck,
  selectDataStatus,
  selectTruckArrivalTime,
  selectTruckLocation,
  selectTrucks,
};
