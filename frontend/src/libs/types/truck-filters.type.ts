import { type TruckFilterField } from '../enums/enums.js';
import { type ValueOf } from './types.js';

type TruckFilters = {
  id: ValueOf<typeof TruckFilterField>;
  desc: boolean;
};

export { type TruckFilters };
