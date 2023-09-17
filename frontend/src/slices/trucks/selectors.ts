import { type RootState } from '~/libs/types/types.js';

import { type TruckLocation } from './types/types.js';

const selectTruckLocation = (state: RootState): TruckLocation | null =>
  state.trucks.truckLocation;

export { selectTruckLocation };
