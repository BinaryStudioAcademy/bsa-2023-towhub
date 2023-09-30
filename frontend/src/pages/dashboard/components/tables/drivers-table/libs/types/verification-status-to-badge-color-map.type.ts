import { type Color, type ValueOf } from '~/libs/types/types.js';
import { type verificationStatusToReadableFormat } from '~/slices/driver/libs/maps/maps.js';

type VerificationStatusToBadgeColorMap = Record<
  ValueOf<typeof verificationStatusToReadableFormat>,
  Color
>;

export { type VerificationStatusToBadgeColorMap };
