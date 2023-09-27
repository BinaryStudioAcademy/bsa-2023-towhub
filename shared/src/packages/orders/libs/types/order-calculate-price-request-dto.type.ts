import { type Coordinates } from '~/libs/types/types.js';

type OrderCalculatePriceRequestDto = {
  startAddress: string | Coordinates;
  endAddress: string | Coordinates;
  pricePerKm: number;
};

export { type OrderCalculatePriceRequestDto };
