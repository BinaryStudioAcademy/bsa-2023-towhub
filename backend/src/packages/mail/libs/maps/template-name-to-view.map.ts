import { type IView } from '~/libs/packages/packages.js';

import { TemplateName } from '../enums/enums.js';
import { type TemplateNameValues } from '../types/types.js';
import { driverCredentials, plainView } from '../views/views.js';

const templateNameToView: Record<TemplateNameValues, IView> = {
  [TemplateName.PLAIN]: plainView,
  [TemplateName.DRIVER_CREDENTIALS]: driverCredentials,
};

export { templateNameToView };
