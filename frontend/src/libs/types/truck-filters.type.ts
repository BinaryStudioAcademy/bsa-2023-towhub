import { type TruckFilterOption } from '../enums/enums.js';
import { type ValueOf } from './types.js';

type TruckFilters = {
  id: ValueOf<typeof TruckFilterOption>;
  desc: boolean;
};

export { type TruckFilters };
