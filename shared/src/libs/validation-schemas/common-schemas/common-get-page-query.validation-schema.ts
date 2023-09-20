import joi from 'joi';

import { CommonValidationMessage } from '~/libs/enums/validation-message.enum.js';
import { type GetPaginatedPageQuery } from '~/libs/types/get-page-request-dto.type';

const commonGetPageQuery = joi.object<GetPaginatedPageQuery, true>({
  size: joi.number().integer().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_SIZE_MUST_BE_NUMBER,
  }),
  page: joi.number().integer().min(0).messages({
    'number.base': CommonValidationMessage.PAGE_INDEX_MUST_BE_NUMBER,
  }),
});

export { commonGetPageQuery };
