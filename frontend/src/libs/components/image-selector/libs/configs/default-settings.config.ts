import { OutputFormat, ViewMode } from '../enums/enums.js';
import { type ImageSelectorSettings } from '../types/types.js';

const DefaultSettings: ImageSelectorSettings = {
  VIEW_MODE: ViewMode.SQUARE,
  INITIAL_ZOOM: 0.8,
  MODAL_SIZE: 400,
  OUTPUT_FORMAT: OutputFormat.PNG,
} as const;

export { DefaultSettings };
