import { type RootState } from '~/libs/types/types.js';

import { type TruckArrivalTime, type TruckLocation } from './types/types.js';

const selectTruckLocation = (state: RootState): TruckLocation | null =>
  state.trucks.truckLocation;

const selectTruckArrivalTime = (state: RootState): TruckArrivalTime | null =>
  state.trucks.truckArrivalTime;

export { selectTruckArrivalTime, selectTruckLocation };
