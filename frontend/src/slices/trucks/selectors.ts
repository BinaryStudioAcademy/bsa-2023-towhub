import { type RootState, type TruckEntity } from '~/libs/types/types.js';

import { type TruckArrivalTime, type TruckLocation } from './types/types.js';

const selectChosenTruck = (
  state: RootState,
): (TruckEntity & { driverId: number }) | null => state.trucks.chosenTruck;

export { selectChosenTruck };

const selectTruckLocation = (state: RootState): TruckLocation | null =>
  state.trucks.truckLocation;

const selectTruckArrivalTime = (state: RootState): TruckArrivalTime | null =>
  state.trucks.truckArrivalTime;

export { selectTruckArrivalTime, selectTruckLocation };
