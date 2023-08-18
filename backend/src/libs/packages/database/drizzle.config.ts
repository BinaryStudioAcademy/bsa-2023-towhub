import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type Config } from 'drizzle-kit';

import { config as appConfig } from '../config/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const drizzleConfig = {
  schema: join(
    __dirname,
    appConfig.ENV.APP.ENVIRONMENT === 'local'
      ? 'schema/tables-schema.ts'
      : 'schema/tables-schema.js',
  ),
  out: join(__dirname, 'generated-schema'),
} satisfies Config;

export { drizzleConfig };
