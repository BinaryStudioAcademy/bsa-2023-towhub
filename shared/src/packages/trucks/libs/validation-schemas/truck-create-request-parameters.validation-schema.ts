import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import { type TruckEntity } from '../types/types.js';

const truckCreateRequestParameters = joi.object<
  Pick<TruckEntity, 'businessId'>,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
});

export { truckCreateRequestParameters };
