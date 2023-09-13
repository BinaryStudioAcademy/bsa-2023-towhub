import { type RootState, type TruckEntity } from '~/libs/types/types.js';

const selectChosenTruck = (
  state: RootState,
): (TruckEntity & { driverId: number }) | undefined => state.trucks.chosenTruck;

export { selectChosenTruck };
