import path from 'node:path';
import url from 'node:url';

import { PlainView } from './plain.view.js';

const pathToTemplate = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  'libs/layout/plain.hbs',
);
const pathToDriverCredentials = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  'libs/layout/driver-credentials.hbs',
);

const plainView = new PlainView(pathToTemplate);
const driverCredentials = new PlainView(pathToDriverCredentials);

export { driverCredentials, plainView };
