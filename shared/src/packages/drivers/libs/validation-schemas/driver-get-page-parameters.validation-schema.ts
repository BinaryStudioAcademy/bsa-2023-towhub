import joi from 'joi';

import {
  type BusinessGetDriversPageRequestQuery,
  DriverValidationMessage,
} from '../types/types.js';

const driverGetPageQuery = joi.object<BusinessGetDriversPageRequestQuery, true>(
  {
    size: joi.number().min(0).messages({
      'number.base': DriverValidationMessage.PAGE_SIZE_MUST_BE_NUMBER,
    }),
    page: joi.number().min(0).messages({
      'number.base': DriverValidationMessage.PAGE_INDEX_MUST_BE_NUMBER,
    }),
  },
);

export { driverGetPageQuery };
