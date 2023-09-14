import { type RootState, type TruckEntity } from '~/libs/types/types.js';

const selectTrucks = (state: RootState): TruckEntity[] => state.trucks.trucks;

export { selectTrucks };
