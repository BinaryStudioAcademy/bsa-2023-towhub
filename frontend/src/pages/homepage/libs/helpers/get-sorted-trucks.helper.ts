import { TruckFilterField } from '~/libs/enums/enums.js';
import { type TruckFilters } from '~/libs/types/types.js';

import { type TruckWithDistance } from '../types/types.js';

const getSortedTrucks = (
  trucks: TruckWithDistance[],
  filters: TruckFilters,
): TruckWithDistance[] => {
  switch (filters.id) {
    case TruckFilterField.LOCATION: {
      return [...trucks].sort(
        (
          { distance: firstTruckDistance = 0 },
          { distance: secondTruckDistance = 0 },
        ) => {
          return filters.desc
            ? secondTruckDistance - firstTruckDistance
            : firstTruckDistance - secondTruckDistance;
        },
      );
    }
    case TruckFilterField.PRICE: {
      return [...trucks].sort((a, b) =>
        filters.desc
          ? b.pricePerKm - a.pricePerKm
          : a.pricePerKm - b.pricePerKm,
      );
    }
    case TruckFilterField.CAPACITY: {
      return [...trucks].sort((a, b) =>
        filters.desc ? b.capacity - a.capacity : a.capacity - b.capacity,
      );
    }
    default: {
      return trucks;
    }
  }
};

export { getSortedTrucks };
