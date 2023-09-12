import path from 'node:path';
import url from 'node:url';

import { PlainView } from './plain.view.js';

const pathToTemplate = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  './layout/plain.hbs',
);

const plainView = new PlainView(pathToTemplate);

export { plainView };
