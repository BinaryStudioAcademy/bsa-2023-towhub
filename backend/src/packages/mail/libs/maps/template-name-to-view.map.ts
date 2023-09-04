import { type IView } from '~/libs/packages/packages.js';

import { TemplateName } from '../enums/enums.js';
import { type TemplateNameValues } from '../types/types.js';
import { plainView } from '../views/views.js';

const TemplateNameToView: Record<TemplateNameValues, IView> = {
  [TemplateName.PLAIN]: plainView,
};

export { TemplateNameToView };
