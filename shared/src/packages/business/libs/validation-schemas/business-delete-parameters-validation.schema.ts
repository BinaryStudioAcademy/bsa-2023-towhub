import joi from 'joi';

import { type BusinessDeleteRequestParameters } from '~/packages/business/libs/types/request/business-delete-request-parameters.type';

import { BusinessValidationMessage } from '../enums/business-validation-message.enum.js';

const businessDeleteParametersValidationSchema = joi.object<
  BusinessDeleteRequestParameters,
  true
>({
  id: joi.number().required().messages({
    'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
  }),
});

export { businessDeleteParametersValidationSchema };
