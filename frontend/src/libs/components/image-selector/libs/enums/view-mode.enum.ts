import { type ViewModeT } from '../types/types.js';

const ViewMode = {
  CIRCLE: 'circle',
  SQUARE: 'square',
} as const satisfies Record<string, ViewModeT>;

export { ViewMode };
