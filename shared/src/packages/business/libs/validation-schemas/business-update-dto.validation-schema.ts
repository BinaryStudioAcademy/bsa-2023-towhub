import joi from 'joi';

import { type BusinessUpdateRequestDto } from '~/packages/business/libs/types/request/business-update-request-dto.type';

import { BusinessValidationMessage } from '../enums/business-validation-message.enum.js';

const businessUpdateDtoValidationSchema = joi.object<
  BusinessUpdateRequestDto,
  true
>({
  companyName: joi.string().trim().required().messages({
    'string.empty': BusinessValidationMessage.COMPANY_NAME_REQUIRED,
  }),
});

export { businessUpdateDtoValidationSchema };
