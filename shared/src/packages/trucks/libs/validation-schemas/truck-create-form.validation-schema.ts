import joi from 'joi';

import { createTruckRules } from '../common-rules/common-rules.js';
import { type TruckAddFormPayload } from '../types/types.js';

const truckCreateForm = joi.object<TruckAddFormPayload, true>({
  ...createTruckRules,
});

export { truckCreateForm };
