import { positiveRequiredIntegerSchema } from '~/libs/validation-schemas/validation-schemas.js';

import { FilesValidationMessage } from '../enums/enums.js';

const filesIdRequestParameter = {
  id: positiveRequiredIntegerSchema(FilesValidationMessage.ID_REQUIRED),
};

export { filesIdRequestParameter };
