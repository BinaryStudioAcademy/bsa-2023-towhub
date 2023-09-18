import { type RootState, type TruckEntity } from '~/libs/types/types.js';

const selectTrucks = (state: RootState): TruckEntity[] => state.trucks.trucks;

const selectChosenTruck = (
  state: RootState,
): (TruckEntity & { driverId: number }) | null => state.trucks.chosenTruck;

export { selectChosenTruck, selectTrucks };
