import { type IView } from '~/libs/packages/view/libs/interfaces/interfaces.js';

import { type TemplateName } from '../enums/enums.js';

type TemplateNameToView = {
  [TemplateName.PLAIN]: IView;
  [TemplateName.DRIVER_CREDENTIALS]: IView;
};

export { type TemplateNameToView };
