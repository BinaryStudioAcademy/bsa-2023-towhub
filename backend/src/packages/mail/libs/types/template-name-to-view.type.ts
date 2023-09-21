import { type IView } from '~/libs/packages/view/libs/interfaces/interfaces.js';

import { type TemplateName } from '../enums/enums.js';
import { type PlainViewRenderParameter } from '../views/plain/libs/types/types.js';

type TemplateNameToView = {
  [TemplateName.PLAIN]: IView<PlainViewRenderParameter>;
};

export { type TemplateNameToView };
