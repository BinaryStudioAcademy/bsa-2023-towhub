import { type IView } from '~/libs/packages/view/libs/interfaces/interfaces.js';

import { type TemplateName } from '../enums/enums.js';
import { type DriverCredentialsViewRenderParameter } from '../views/driver-credentials/libs/types/types.js';
import { type PlainViewRenderParameter } from '../views/plain/libs/types/types.js';

type TemplateNameToView = {
  [TemplateName.PLAIN]: IView<PlainViewRenderParameter>;
  [TemplateName.DRIVER_CREDENTIALS]: IView<DriverCredentialsViewRenderParameter>;
};

export { type TemplateNameToView };
