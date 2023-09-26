import { TemplateName } from '../enums/enums.js';
import { type TemplateNameToView } from '../types/types.js';
import { driverCredentials, plainView } from '../views/views.js';

const templateNameToView: TemplateNameToView = {
  [TemplateName.PLAIN]: plainView,
  [TemplateName.DRIVER_CREDENTIALS]: driverCredentials,
};

export { templateNameToView };
