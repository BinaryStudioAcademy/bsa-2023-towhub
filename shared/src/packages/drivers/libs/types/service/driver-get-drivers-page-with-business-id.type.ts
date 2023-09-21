import { type DriverBusinessIdPayload } from './driver-business-id-payload.type.js';
import { type DriverGetDriversPagePayload } from './driver-get-drivers-page.js';

type DriverGetDriversPayloadWithBusinessId = DriverGetDriversPagePayload &
  DriverBusinessIdPayload;

export { type DriverGetDriversPayloadWithBusinessId };
