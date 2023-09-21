import { type RootState, type TruckEntityT } from '~/libs/types/types.js';

const selectChosenTruck = (
  state: RootState,
): (TruckEntityT & { driverId: number }) | null => state.trucks.chosenTruck;

export { selectChosenTruck };
