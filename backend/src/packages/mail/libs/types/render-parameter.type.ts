import { type DriverCredentialsViewRenderParameter } from '../views/driver-credentials/libs/types/types.js';
import { type PlainViewRenderParameter } from '../views/plain/libs/types/types.js';

type RenderParameter =
  | PlainViewRenderParameter
  | DriverCredentialsViewRenderParameter;

export { type RenderParameter };
