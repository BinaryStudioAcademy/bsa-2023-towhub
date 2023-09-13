import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { createTruckRules } from '../common-rules/common-rules.js';
import { type TruckAddRequestDto } from '../types/types.js';

const truckCreateRequestBody = joi.object<TruckAddRequestDto, true>({
  ...createTruckRules,
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { truckCreateRequestBody };
