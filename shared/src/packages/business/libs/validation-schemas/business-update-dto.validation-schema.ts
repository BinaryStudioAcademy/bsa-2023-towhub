import joi from 'joi';

import { type BusinessUpdateRequestDto } from '~/packages/business/libs/types/request/business-update-request-dto.type';

import { BusinessValidationMessage } from '../enums/business-validation-message.enum.js';

const businessUpdateDtoValidationSchema = joi.object<BusinessUpdateRequestDto, true>({
    companyName: joi.string().trim().messages({
        'string.empty': BusinessValidationMessage.COMPANY_NAME_REQUIRED,
    })
}).min(1).messages({
    'object.empty': BusinessValidationMessage.UPDATE_AT_LEAST_ONE_FIELD
});

export { businessUpdateDtoValidationSchema };