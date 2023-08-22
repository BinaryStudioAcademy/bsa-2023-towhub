import joi from 'joi';

import { BusinessValidationMessage } from '../enums/business-validation-message.enum.js';
import { type BusinessUpdateRequestParameters } from '../types/request/business-update-request-parameters.type.js';

const businessUpdateParametersValidationSchema = joi.object<BusinessUpdateRequestParameters, true>({
    id: joi.number().required().messages({
        'number': BusinessValidationMessage.ID_MUST_BE_NUMBER,
    }),
});

export { businessUpdateParametersValidationSchema };