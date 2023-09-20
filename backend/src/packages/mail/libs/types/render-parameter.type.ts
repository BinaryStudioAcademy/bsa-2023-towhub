import { type templateNameToView } from '../maps/maps.js';
import { type TemplateNameValues } from './template-name-values.type.js';

type RenderParameter<T extends TemplateNameValues = TemplateNameValues> =
  Parameters<(typeof templateNameToView)[T]['render']>[0];

export { type RenderParameter };
