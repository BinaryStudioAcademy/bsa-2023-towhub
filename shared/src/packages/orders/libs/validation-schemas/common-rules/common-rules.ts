import joi from 'joi';

import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';
import { UserValidationRule } from '~/packages/users/libs/validation-schemas/enums/enums.js';

import { OrdersValidationMessage } from '../../enums/enums.js';

const orderRules = {
  scheduledTime: joi.string().isoDate().required(),
  carsQty: positiveRequiredIntegerSchema(
    OrdersValidationMessage.CARS_QTY_MUST_BE_NUMBER,
  ),
  truckId: positiveRequiredIntegerSchema(
    OrdersValidationMessage.TRUCK_ID_MUST_BE_NUMBER,
  ),
  customerName: joi.string().pattern(UserValidationRule.NAME).allow(null),
  customerPhone: joi.string().pattern(UserValidationRule.PHONE).allow(null),
};

export { orderRules };
