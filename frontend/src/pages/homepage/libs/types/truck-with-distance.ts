import { type TruckGetItemResponseDto } from '~/packages/trucks/libs/types/types.js';

type TruckWithDistance = TruckGetItemResponseDto & {
  distance: number | undefined;
};

export { type TruckWithDistance };
