import joi from 'joi';

import { type BusinessAddRequestDto } from '~/packages/business/libs/types/request/business-add-request-dto.type';

import { BusinessValidationMessage } from '../enums/business-validation-message.enum.js';

const businessAddDtoValidationSchema = joi.object<BusinessAddRequestDto, true>({
    companyName: joi.string().trim().required().messages({
        'string.empty': BusinessValidationMessage.COMPANY_NAME_REQUIRED,
    }),
    taxNumber: joi.string().trim().regex(/^\d{10}$/).required().messages({
        'string.empty': BusinessValidationMessage.TAX_NUMBER_REQUIRED,
    }),
});

export { businessAddDtoValidationSchema };