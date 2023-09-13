import { type RootState, type TruckEntity } from '~/libs/types/types.js';

const selectChosenTruck = (
  state: RootState,
): (TruckEntity & { driverId: number }) | null => state.trucks.chosenTruck;

export { selectChosenTruck };
