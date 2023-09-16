import { TemplateName } from '../enums/enums.js';
import { plainView } from '../views/views.js';

const templateNameToView = {
  [TemplateName.PLAIN]: plainView,
} as const;

export { templateNameToView };
