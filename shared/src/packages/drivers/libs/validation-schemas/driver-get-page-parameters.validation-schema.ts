import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { BusinessValidationMessage } from '~/packages/business/business.js';

import {
  type BusinessGetDriversPageRequestParameters,
  DriverValidationMessage,
} from '../types/types.js';

const driverGetPageParameters = joi.object<
  BusinessGetDriversPageRequestParameters,
  true
>({
  businessId: positiveRequiredIntegerSchema(
    BusinessValidationMessage.ID_MUST_BE_NUMBER,
  ),
  pageSize: joi.number().min(0).required().messages({
    'number.base': DriverValidationMessage.PAGE_SIZE_MUST_BE_NUMBER,
  }),
  pageIndex: joi.number().min(0).required().messages({
    'number.base': DriverValidationMessage.PAGE_INDEX_MUST_BE_NUMBER,
  }),
});

export { driverGetPageParameters };
