import { type DriverAddPayload } from './driver-add-payload.type.js';
import { type DriverBusinessIdPayload } from './driver-business-id-payload.type.js';

type DriverAddPayloadWithBusinessId = DriverAddPayload &
  DriverBusinessIdPayload;

export { type DriverAddPayloadWithBusinessId };
