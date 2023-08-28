import { type ValueOf } from '~/libs/types/types.js';

import { type TemplateName } from '../enums/enums.js';

type TemplateNames = ValueOf<typeof TemplateName>;

export { type TemplateNames as TemplateNamesT };
