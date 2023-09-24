import { type LightColor } from '~/libs/types/color.type';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProgressStatus } from '../enums/progress-status.js';

type BadgeStatus = {
  badgeBg: LightColor;
  progress: ValueOf<typeof ProgressStatus>;
};

export { type BadgeStatus };
