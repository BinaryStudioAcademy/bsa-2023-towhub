import { TemplateName } from '../enums/enums.js';
import { type TemplateNameToView } from '../types/types.js';
import { plainView } from '../views/views.js';

const templateNameToView: TemplateNameToView = {
  [TemplateName.PLAIN]: plainView,
};

export { templateNameToView };
