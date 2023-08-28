import { TemplateName } from '../enums/enums.js';
import { plainView } from './plain/plain.js';

const ViewsMapper = {
  [TemplateName.PLAIN]: plainView,
};

export { ViewsMapper };
